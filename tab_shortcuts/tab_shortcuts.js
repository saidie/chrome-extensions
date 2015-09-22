chrome.commands.onCommand.addListener(function(command) {
  var callback;
  if ( command === "show-next-tab" ) {
    callback = function(tabs) {
      var tab = tabs[0];
      chrome.tabs.query({ windowId: tab.windowId, index: tab.index + 1 }, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.update(tab.id, { active: true });
      });
    };
  }
  else if ( command === "show-prev-tab" ) {
    callback = function(tabs) {
      var tab = tabs[0];
      if ( tab.index > 0 ) {
        chrome.tabs.query({ windowId: tab.windowId, index: tab.index - 1 }, function(tabs) {
          var tab = tabs[0];
          chrome.tabs.update(tab.id, { active: true });
        });
      }
    };
  }
  else if ( command === "move-tab-next" ) {
    callback = function(tabs) {
      var tab = tabs[0];
      chrome.tabs.move(tab.id, { index: tab.index + 1 });
    };
  }
  else if ( command === "move-tab-prev" ) {
    callback = function(tabs) {
      var tab = tabs[0];
      if ( tab.index > 0 ) {
        chrome.tabs.move(tab.id, { index: tab.index - 1 });
      }
    };
  }

  if ( callback ) {
    chrome.tabs.query({ active: true }, callback);
  }
});
