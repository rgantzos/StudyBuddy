try {
chrome.storage.sync.get("sites", function(obj) {
    var sites = obj.sites
    if (sites !== undefined) {
        sites.forEach(function(el) {
            if (el !== null && el !== undefined && el !== '') {
                if (!document.querySelector('.urls').className.includes('done')) {
                    document.querySelector('.urls').className = 'urls done'
                    document.querySelector('.urls').textContent = ''
                }
            var a = document.createElement('div')
            var spana = document.createElement('span')
            spana.textContent = el
            a.appendChild(spana)
            document.querySelector('.urls').appendChild(a)
            spana.onclick = function() {
                chrome.tabs.create({url:el})
            }
            var span = document.createElement('span')
            span.textContent = 'X'
            span.style.marginLeft = '5vw'
            span.className = 'remove'
            spana.className = 'text'
            a.className = 'link'
            a.appendChild(span)
            span.onclick = function() {
                span.parentNode.remove()
                chrome.storage.sync.get("sites", function(obj) {
                    delete obj.sites[obj.sites.indexOf(el)]
                    chrome.storage.sync.set({"sites":obj.sites})
                })
            }
        }
        })
    }
})
chrome.storage.sync.get("paste", function(obj) {
    var sites = obj.paste
    if (sites !== undefined) {
        sites.forEach(function(el) {
            if (el !== null && el !== undefined && el !== '') {
                if (!document.querySelector('.pastes').className.includes('done')) {
                    document.querySelector('.pastes').className = 'pastes done'
                    document.querySelector('.pastes').textContent = ''
                }
            var a = document.createElement('div')
            var spana = document.createElement('span')
            spana.textContent = el
            a.appendChild(spana)
            document.querySelector('.pastes').appendChild(a)
            var span = document.createElement('span')
            span.textContent = 'X'
            span.style.marginLeft = '5vw'
            span.className = 'remove'
            spana.className = ''
            a.className = 'link'
            a.appendChild(span)
            a.style.display = 'block'
            span.onclick = function() {
                span.parentNode.remove()
                chrome.storage.sync.get("paste", function(obj) {
                    delete obj.paste[obj.paste.indexOf(el)]
                    chrome.storage.sync.set({"paste":obj.paste})
                })
            }
        }
        })
    }
})
} catch(err) {}

function handlePaste(e) {
        var clipboardData, pastedData;
      
        // Stop data actually being pasted into div
        e.stopPropagation();
        e.preventDefault();
      
        // Get pasted data via clipboard API
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData('Text');
      
        // Do whatever with pasteddata
    chrome.storage.sync.get("paste", async function(obj) {
        if (obj.paste === undefined) {
            obj.paste = [pastedData]
        } else {
            obj.paste.push(pastedData)
        }
        await chrome.storage.sync.set({"paste":obj.paste})
        window.close();
    })
  }

document.addEventListener('paste', handlePaste);