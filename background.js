chrome.contextMenus.create({title: 'Add to Study Guide', id: 'studyBuddyBookmark'});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId = 'studyBuddyBookmark') {
    chrome.storage.sync.get("sites", function(obj) {
        if (obj.sites === undefined) {
            chrome.storage.sync.set({"sites":[tab.url]})
        } else {
            obj.sites.push(tab.url)
            chrome.storage.sync.set({"sites":obj.sites})
        }
    })
  }
})
