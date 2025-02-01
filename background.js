const reloadingTabs = new Set();

chrome.webNavigation.onCommitted.addListener(function (details) {
    console.log('onCommitted:', details);
    if (details.frameId === 0) {
        // Only consider top-level frames
        if (details.transitionType === "reload") {
            chrome.storage.sync.get("clearCacheState", function (data) {
                if (data.clearCacheState) {
                    if (reloadingTabs.has(details.tabId)) {
                        // This reload was initiated by us; remove it from the set
                        reloadingTabs.delete(details.tabId);
                        console.log("Reloaded tab through extension, not reloading again.");
                    } else {
                        // User-initiated reload
                        console.log('User-initiated reload detected for tabId:', details.tabId);
                        reloadingTabs.add(details.tabId);
                        chrome.tabs.reload(details.tabId, { bypassCache: true }, function () {
                            console.log("Cache cleared and tab reloaded");
                        });
                    }
                }
            });
        }
    }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(['totalObjectsAdminState', 'autofillCepState', 'clearCacheState'], function(data) {
      console.log('onInstalled: totalObjectsAdminState:', data.totalObjectsAdminState);
      console.log('onInstalled: autofillCepState:', data.autofillCepState);
      console.log('onInstalled: clearCacheState:', data.clearCacheState);
      if (data.totalObjectsAdminState) {
          applyTotalObjectsAdminState();
      }
      if (data.autofillCepState) {
          applyAutofillCepState();
      }
    //   if (data.clearCacheState) {
    //     applyClearCacheState();
    // }
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
  if (changes.clearCacheState) {
    console.log('onChanged: clearCacheState:', changes.clearCacheState.newValue);
    // We don't want a refresh on toggle, so this remains commented out
    //applyClearCacheState();
}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
      console.log('onUpdated: Tab updated, applying state');
      applyTotalObjectsAdminState();
      applyAutofillCepState();
      //applyClearCacheState();
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

// Retrieve capy code list
// Schedule the alarm to fetch codes once a day
chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('fetchCodes', { periodInMinutes: 1440 });
  });
  
  // Listen for the alarm
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'fetchCodes') {
      fetchCodesFromWebsite();
    }
  });
  
  function fetchCodesFromWebsite() {
    fetch('https://www.escapistmagazine.com/capybara-go-codes/')
      .then((response) => response.text())
      .then((htmlContent) => {
        const codesList = extractCodes(htmlContent);
        // Save the codes to storage
        chrome.storage.local.set({ capybaraCodes: codesList }, () => {
          console.log('Codes updated');
        });
      })
      .catch((error) => {
        console.error('Error fetching codes:', error);
      });
  }
  
  // Parsing function (same as before)
  function extractCodes(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const listItems = doc.querySelectorAll('ul.wp-block-list > li');
    const codes = [];
    listItems.forEach((item) => {
      const codeElement = item.querySelector('strong');
      const code = codeElement ? codeElement.textContent.trim() : null;
      const rewardText = item.innerHTML.split('</strong>:')[1];
      const reward = rewardText ? rewardText.split('<')[0].trim() : null;
      if (code && reward) {
        codes.push({ code, reward });
      }
    });
    return codes;
  }