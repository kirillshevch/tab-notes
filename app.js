var App = {
  init: function() {
    area = document.getElementById('actionBoard');
    chrome.tabs.onActivated.addListener(function(e) {
      chrome.tabs.query({active: true}, function(active) {
        chrome.tabs.getCurrent(function(current) {
          area.innerHTML = window.localStorage.getItem('content');
        });
      });
    });

    chrome.windows.onFocusChanged.addListener(function(e) {
      area.innerHTML = window.localStorage.getItem('content');
    });

    area.innerHTML = this.content();
    if (area.addEventListener) {
      area.addEventListener("input", this.listener, false);
      area.addEventListener("DOMNodeInserted", this.listener, false);
      area.addEventListener("DOMNodeRemoved", this.listener, false);
      area.addEventListener("DOMCharacterDataModified", this.listener, false);
    }
  },

  content: function() {
    return window.localStorage.getItem('content');
  },

  listener: function(e) {
    chrome.storage.local.set({'content': document.getElementById('actionBoard').innerHTML}, function() {});
    window.localStorage.setItem('content', document.getElementById('actionBoard').innerHTML);
  }
}

window.onload = function() {
  App.init();
};
