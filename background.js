chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "activate") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "activate"});
      });
  }
});
