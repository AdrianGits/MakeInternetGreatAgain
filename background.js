chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(['totalObjectsAdminState', 'autofillCepState'], function(data) {
      console.log('onInstalled: totalObjectsAdminState:', data.totalObjectsAdminState);
      console.log('onInstalled: autofillCepState:', data.autofillCepState);
      if (data.totalObjectsAdminState) {
          applyTotalObjectsAdminState();
      }
      if (data.autofillCepState) {
          applyAutofillCepState();
      }
  });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.totalObjectsAdminState) {
      console.log('onChanged: totalObjectsAdminState:', changes.totalObjectsAdminState.newValue);
      applyTotalObjectsAdminState();
  }
  if (changes.autofillCepState) {
      console.log('onChanged: autofillCepState:', changes.autofillCepState.newValue);
      applyAutofillCepState();
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
      console.log('onUpdated: Tab updated, applying state');
      applyTotalObjectsAdminState();
      applyAutofillCepState();
  }
});

function applyTotalObjectsAdminState() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
          chrome.storage.sync.get('totalObjectsAdminState', function(data) {
              console.log('applyTotalObjectsAdminState: totalObjectsAdminState:', data.totalObjectsAdminState);
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

function applyAutofillCepState() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
          chrome.storage.sync.get('autofillCepState', function(data) {
              console.log('applyAutofillCepState: autofillCepState:', data.autofillCepState);
              if (data.autofillCepState) {
                  chrome.tabs.sendMessage(tabs[0].id, {action: "activateAutofillCep"}, function(response) {
                      console.log('Autofill CEP activated');
                  });
              } else {
                  chrome.tabs.sendMessage(tabs[0].id, {action: "deactivateAutofillCep"}, function(response) {
                      console.log('Autofill CEP deactivated');
                  });
              }
          });
      }
  });
}
