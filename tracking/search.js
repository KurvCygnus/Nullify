(function()
{
    'use strict'

    var data = window.NULLIFY_SEARCH_DATA || []
    var input = document.getElementById('search-input')
    var results = document.getElementById('search-results')
    if(!input || !results)
        return

    function escapeHtml(text)
    {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
    }

    //* Normalize a number query: strip the NL-I/NL-F prefix and the kind letter.
    function numberQuery(query)
    {
        var m = /^\s*(?:NL[-_])?([IFif]?)\s*(\d+(?:\.\d+)?)\s*$/.exec(query)
        if(!m)
            return null
        var kind = m[1].toUpperCase()
        var number = m[2]
        return { kind: kind || null, number: number }
    }

    function matchesNumber(query, entry)
    {
        var q = numberQuery(query)
        if(!q)
            return false
        if(q.kind !== null)
        {
            var wantKind = q.kind === 'I' ? 'issue' : 'feature'
            if(entry.kind !== wantKind)
                return false
        }
        var idNumber = /^NL-[IF](\d+(?:\.\d+)?)$/.exec(entry.id)
        if(!idNumber)
            return false
        return idNumber[1] === q.number
    }

    function matchesText(query, entry)
    {
        var tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
        if(tokens.length === 0)
            return false
        var haystacks = [entry.id, entry.title].concat(entry.headers || [])
            .join(' ')
            .toLowerCase()
        return tokens.every(function(token)
        {
            return haystacks.indexOf(token) !== -1
        })
    }

    function render(items)
    {
        if(items.length === 0)
        {
            results.innerHTML = '<p class="none">No matching documents.</p>'
            results.hidden = false
            return
        }

        var issues = items.filter(function(e) { return e.kind === 'issue' })
        var features = items.filter(function(e) { return e.kind === 'feature' })
        var out = ''

        function section(title, list)
        {
            if(list.length === 0)
                return ''
            return '<h4>' + title + '</h4><ul>' + list.map(function(entry)
            {
                return '<li><a href="' + escapeHtml(entry.url) + '">' + escapeHtml(entry.id) + '</a> — ' + escapeHtml(entry.title) + '</li>'
            }).join('') + '</ul>'
        }

        out = section('Issues', issues) + section('Features', features)
        results.innerHTML = out
        results.hidden = false
    }

    input.addEventListener('input', function()
    {
        var query = input.value.trim()
        if(query.length === 0)
        {
            results.hidden = true
            return
        }
        var matches = data.filter(function(entry)
        {
            return matchesNumber(query, entry) || matchesText(query, entry)
        })
        render(matches)
    })
})()
