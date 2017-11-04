chrome.commands.onCommand.addListener(function(command) {
  var callback;
  if ( command === "move-tab-next" ) {
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
    chrome.tabs.query({ active: true, currentWindow: true }, callback);
  }
});
