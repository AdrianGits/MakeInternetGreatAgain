chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get('totalObjectsAdminState', function(data) {
      if (data.totalObjectsAdminState) {
          applyTotalObjectsAdminState();
      }
  });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.totalObjectsAdminState) {
      applyTotalObjectsAdminState();
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
      applyTotalObjectsAdminState();
  }
});

function applyTotalObjectsAdminState() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
          chrome.storage.sync.get('totalObjectsAdminState', function(data) {
              if (data.totalObjectsAdminState) {
                  chrome.tabs.sendMessage(tabs[0].id, {action: "activate"}, function(response) {
                      console.log('TotalObjects Admin activated');
                  });
              } else {
                  chrome.tabs.sendMessage(tabs[0].id, {action: "deactivate"}, function(response) {
                      console.log('TotalObjects Admin deactivated');
                  });
              }
          });
      }
  });
}
