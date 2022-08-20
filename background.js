chrome.contextMenus.create({title: 'Add to Study Guide', id: 'studyBuddyBookmark'});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId = 'studyBuddyBookmark') {
    var domain = (new URL(tab.url));
    domain = domain.protocol+'//'+domain.hostname;
    chrome.storage.sync.get("sites", function(obj) {
        if (obj.sites === undefined) {
            chrome.storage.sync.set({"sites":[domain]})
        } else {
            obj.sites.push(domain)
            chrome.storage.sync.set({"sites":obj.sites})
        }
    })
  }
})