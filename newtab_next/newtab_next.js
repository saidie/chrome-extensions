var lastActiveTab = {};

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    lastActiveTab[tab.windowId] = tab.index;
  });
});

chrome.tabs.onCreated.addListener(function(tab) {
  if ( lastActiveTab[tab.windowId] != null ) {
    chrome.tabs.move(tab.id, { index: lastActiveTab[tab.windowId] + 1 });
  }
})

chrome.tabs.onMoved.addListener(function(tabId, moveInfo) {
  if ( lastActiveTab[moveInfo.windowId] == moveInfo.fromIndex ) {
    lastActiveTab[moveInfo.windowId] = moveInfo.toIndex;
  }
});
