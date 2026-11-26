import van from './van.js';
const { tags, state, derive, add } = van;
const ALL_DATA = window.NULLIFY_SEARCH_DATA ?? [];
const ICONS = window.NULLIFY_STATUS_ICONS ?? {};
function statusKeyword(status) {
    const m = /^([A-Za-z]+)/.exec(status);
    return m ? m[1] : 'Unknown';
}
//* 显示不带 NL- 前缀的代码 (`NL-I16.3` -> `I16.3`); URL 保留
//* 完整的 id.
function displayId(id) { return id.startsWith('NL-') ? id.slice(3) : id; }
function numberQuery(query) {
    const m = /^\s*(?:NL[-_])?([IFif]?)\s*(\d+(?:\.\d+)?)\s*$/.exec(query);
    if (!m)
        return null;
    const letter = m[1].toUpperCase();
    return { kind: letter === 'I' ? 'issue' : letter === 'F' ? 'feature' : null, number: m[2] };
}
function idNumber(entry) {
    const m = /^NL-[IF](\d+(?:\.\d+)?)$/.exec(entry.id);
    return m ? m[1] : null;
}
function matches(entry, query, kindFilter) {
    if (kindFilter !== 'all' && entry.kind !== kindFilter)
        return false;
    const q = query.trim();
    if (q === '')
        return true;
    const num = numberQuery(q);
    if (num) {
        if (num.kind !== null && entry.kind !== num.kind)
            return false;
        if (idNumber(entry) === num.number)
            return true;
    }
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0)
        return false;
    const haystack = `${entry.id} ${entry.title} ${entry.statusLabel} ${entry.content}`.toLowerCase();
    return tokens.every(token => haystack.includes(token));
}
function escapeText(text) { return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escapeRegex(text) { return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function highlight(text, query) {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let out = escapeText(text);
    for (const token of tokens)
        out = out.replace(new RegExp(`(${escapeRegex(token)})`, 'gi'), '<mark>$1</mark>');
    return out;
}
//* 标题可能携带内联代码 (例如 `Back to `IrNode``).先转义, 然后
//* 将反引号片段换成占位符, 高亮查询词, 最后将
//* 片段还原为 <code> - 在代码包裹之后高亮会让查询
//* 词匹配到标签名并产生损坏的标记.
function renderTitle(title, query) {
    const codes = [];
    let out = escapeText(title).replace(/`([^`]+)`/g, (_m, code) => {
        codes.push(code);
        return `\u0000${codes.length - 1}\u0000`;
    });
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    for (const token of tokens)
        out = out.replace(new RegExp(`(${escapeRegex(token)})`, 'gi'), '<mark>$1</mark>');
    return out.replace(/\u0000(\d+)\u0000/g, (_m, index) => `<code>${codes[Number(index)]}</code>`);
}
function hashKind() {
    const h = window.location.hash;
    if (h === '#issues')
        return 'issue';
    if (h === '#features')
        return 'feature';
    return null;
}
function updateHash(kind) {
    const target = kind === 'all' ? '' : `#${kind === 'issue' ? 'issues' : 'features'}`;
    try {
        history.replaceState(null, '', window.location.pathname + window.location.search + target);
    }
    catch { /* 无操作 */ }
}
function mountSearch() {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const filterBar = document.getElementById('filter-bar');
    if (!input || !results || !filterBar)
        return;
    const query = state('');
    const kindFilter = state('all');
    //* 文档页面上的面包屑链接 (index.html#issues / #features)
    //* 会预先选中一个分类过滤器.
    const preset = hashKind();
    if (preset != null)
        kindFilter.val = preset;
    const chips = ['all', 'issue', 'feature'];
    const chipLabels = { all: 'All', issue: 'Issues', feature: 'Features' };
    //* 筛选器: derived 状态保持当前激活的 chip 高亮; 点击设置
    //* kindFilter (并同步 hash), 从而重新渲染下面绑定的所有内容.
    const chipBar = tags.div({ class: 'chip-bar' }, ...chips.map(kind => tags.button({
        class: derive(() => `chip${kindFilter.val === kind ? ' chip-active' : ''}`),
        type: 'button',
        onclick: () => {
            kindFilter.val = kind;
            updateHash(kind);
        }
    }, chipLabels[kind], tags.span({ class: 'chip-count' }, String(ALL_DATA.filter(e => kind === 'all' || e.kind === kind).length)))));
    add(filterBar, chipBar);
    const visible = derive(() => ALL_DATA.filter(e => matches(e, query.val, kindFilter.val)));
    input.addEventListener('input', () => { query.val = input.value; });
    function resultsContent() {
        const items = visible.val;
        if (items.length === 0)
            return tags.p({ class: 'none' }, 'No matching documents.');
        const sections = [];
        for (const kind of ['issue', 'feature']) {
            const list = items.filter(e => e.kind === kind);
            if (list.length === 0)
                continue;
            sections.push(tags.section(tags.h4(kind === 'issue' ? 'Issues' : 'Features'), tags.ul(...list.map(e => {
                const kw = statusKeyword(e.status);
                return tags.li({ class: 'entry' }, 
                //* 状态矢量图标 (装饰用途; 完整的状态文本
                //* 位于下方链接的悬停/聚焦提示中).ICONS
                //* 值是由服务端生成的固定字符串 (参见
                //* statusIconsSvgMap), 可安全注入.
                tags.span({ class: `status-icon status-${kw.toLowerCase()}`, 'aria-hidden': 'true', innerHTML: ICONS[kw] ?? '' }), tags.a({ href: e.url, title: e.statusLabel }, displayId(e.id)), tags.span({ class: 'entry-title', innerHTML: renderTitle(e.title, query.val) }));
            }))));
        }
        return tags.div({ class: 'search-results-list' }, ...sections);
    }
    //* 函数子节点会在其读取的 state 发生变化时重新执行 (VanJS 绑定).
    add(results, () => resultsContent());
    results.hidden = false;
}
function mountTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle)
        return;
    toggle.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem('nullify-theme', next);
        }
        catch { /* 无操作 */ }
    });
}
mountTheme();
mountSearch();
