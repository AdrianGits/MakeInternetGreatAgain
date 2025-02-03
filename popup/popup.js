document.addEventListener('DOMContentLoaded', function() {
  var toggleTotalObjectsAdmin = document.getElementById('toggleTotalObjectsAdmin');
  var toggleAutofillCep = document.getElementById('toggleAutofillCep');
  var toggleClearCache = document.getElementById('toggleClearCache');
  const tabButtons = document.querySelectorAll('.leftMenuOption');
  const tabContents = document.querySelectorAll('.tab-content');
  const fetchCodesBtn = document.getElementById('fetchCodesBtn');
  const codesTable = document.getElementById('codesTable');
  const capyidInput = document.getElementById('capyidInput');
  const iframe = document.querySelector('iframe');
  const autofillButton = document.getElementById('autofillButton');

  iframe.addEventListener('load', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.webNavigation.getAllFrames({ tabId: tabs[0].id }, function(frames) {
        frames.forEach(function(frame) {
          if (frame.url.includes('https://gift.capybarago.io/')) {
            chrome.scripting.executeScript(
              {
                target: { tabId: tabs[0].id, frameIds: [frame.frameId] },
                files: ['content_scripts/iframe_content.js']
              },
              () => {
                console.log('Content script injected into iframe');
              }
            );

            autofillButton.addEventListener('click', function() {
              const capyidValue = capyidInput.value.trim();
              chrome.tabs.sendMessage(
                tabs[0].id,
                { action: 'autofillFields', capyid: capyidValue },
                { frameId: frame.frameId }
              );
            });
          }
        });
      });
    });
  });



  //Left menu switch logic
  // Initially show the "About" tab
  //showTab('about');
  // Initially show the last saved tab, can remove in live version and uncomment above
  const savedTab = localStorage.getItem('activeTab') || 'about';
  showTab(savedTab);

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;
      showTab(tabId);
      //Remember the last tab, can remove in live version
      localStorage.setItem('activeTab', tabId);

    });
  });

  function showTab(tabId) {
    tabContents.forEach(content => {
      content.classList.remove('active-tab');
    });

    const selectedContent = document.getElementById(`${tabId}-content`);
    selectedContent.classList.add('active-tab');

    tabButtons.forEach(button => {
      button.classList.remove('active-menu-tab');
    });
  
    const selectedButton = document.querySelector(`.leftMenuOption[data-tab="${tabId}"]`);
    selectedButton.classList.add('active-menu-tab');
  }

  // Retrieve and combine capy codes
  chrome.storage.local.get('capybaraCodes', (data) => {
    const codesList = data.capybaraCodes || [];
    const codesTable = document.getElementById('codesTable');
    if (codesList.length > 0) {
      codesList.forEach((codeObj) => {
        const codeElement = document.createElement('div');
        codeElement.innerHTML = `<strong>${codeObj.code}</strong>: ${codeObj.reward}`;
        codesTable.appendChild(codeElement);
      });
    } else {
      codesTable.textContent = 'No codes available at the moment.';
    }
  });

  fetchCodesBtn.addEventListener('click', () => {
    fetchLatestCodes();
});

// Manual fetch latest codes logic
function fetchLatestCodes() {
    // Display a loading message
    codesTable.textContent = 'Fetching latest codes...';

    // Fetch the HTML content from the website
    fetch('https://www.escapistmagazine.com/capybara-go-codes/')
        .then((response) => response.text())
        .then((htmlContent) => {
            const codesList = extractCodes(htmlContent);
            displayCodes(codesList);
        })
        .catch((error) => {
            console.error('Error fetching codes:', error);
            codesTable.textContent = 'Failed to fetch codes. Please check source or try again later.';
        });
}

function extractCodes(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const listItems = doc.querySelectorAll('ul.wp-block-list > li');
    const codes = [];
    listItems.forEach((item) => {
        const codeElement = item.querySelector('strong');
        const code = codeElement ? codeElement.textContent.trim() : null;
        const rewardTextMatch = item.innerText.match(/:\s*(.*)/);
        const reward = rewardTextMatch ? rewardTextMatch[1].trim() : null;
        if (code || reward) {
            codes.push({ code, reward });
        }
    });
    return codes;
}

function displayCodes(codesList) {
    // Clear the container
    codesTable.innerHTML = '';

    if (codesList.length > 0) {
        codesList.forEach((codeObj) => {
            const codeElement = document.createElement('div');
            codeElement.classList.add('code-item');
            codeElement.innerHTML = `<strong>${codeObj.code}</strong>: ${codeObj.reward}`;
            codesTable.appendChild(codeElement);
        });
    } else {
        codesTable.textContent = 'No codes available at the moment.';
    }
}

  // Retrieve the stored state and set the checkboxes accordingly
  chrome.storage.sync.get(['totalObjectsAdminState', 'autofillCepState', 'clearCacheState'], function(data) {
      if (data.totalObjectsAdminState) {
          toggleTotalObjectsAdmin.checked = true;
      } else {
          toggleTotalObjectsAdmin.checked = false;
      }

      if (data.autofillCepState) {
          toggleAutofillCep.checked = true;
      } else {
          toggleAutofillCep.checked = false;
      }
      if (data.clearCacheState) {
        toggleClearCache.checked = true;
        } else {
        toggleClearCache.checked = false;
        }

      console.log('DOMContentLoaded: totalObjectsAdminState:', data.totalObjectsAdminState);
      console.log('DOMContentLoaded: autofillCepState:', data.autofillCepState);
      console.log('DOMContentLoaded: toggleClearCache:', data.toggleClearCache);
  });

  toggleTotalObjectsAdmin.addEventListener('change', function() {
      if (toggleTotalObjectsAdmin.checked) {
          chrome.storage.sync.set({totalObjectsAdminState: true}, function() {
              console.log('TotalObjects Admin state saved as ON');
              activateTotalObjectsAdmin();
          });
      } else {
          chrome.storage.sync.set({totalObjectsAdminState: false}, function() {
              console.log('TotalObjects Admin state saved as OFF');
              deactivateTotalObjectsAdmin();
          });
      }
  });

  toggleAutofillCep.addEventListener('change', function() {
      if (toggleAutofillCep.checked) {
          chrome.storage.sync.set({autofillCepState: true}, function() {
              console.log('Autofill CEP state saved as ON');
              activateAutofillCep();
          });
      } else {
          chrome.storage.sync.set({autofillCepState: false}, function() {
              console.log('Autofill CEP state saved as OFF');
              deactivateAutofillCep();
          });
      }
  });

  toggleClearCache.addEventListener('change', function() {
    if (toggleClearCache.checked) {
        chrome.storage.sync.set({clearCacheState: true}, function() {
            console.log('Clear Cache state saved as ON');
            activateClearCache();
        });
    } else {
        chrome.storage.sync.set({clearCacheState: false}, function() {
            console.log('Clear Cache state saved as OFF');
            deactivateClearCache();
        });
    }
});

  function activateTotalObjectsAdmin() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "activate"}, function(response) {
              console.log('TotalObjects Admin activated');
          });
      });
  }

  function deactivateTotalObjectsAdmin() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "deactivate"}, function(response) {
              console.log('TotalObjects Admin deactivated');
          });
      });
  }

  function activateAutofillCep() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "activateAutofillCep"}, function(response) {
              console.log('Autofill CEP activated');
          });
      });
  }

  function deactivateAutofillCep() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "deactivateAutofillCep"}, function(response) {
              console.log('Autofill CEP deactivated');
          });
      });
  }

  function activateClearCache() {
    chrome.runtime.sendMessage({action: "activateClearCache"});
}

function deactivateClearCache() {
    chrome.runtime.sendMessage({action: "deactivateClearCache"});
}

  // Retrieve and display stored capyid
  chrome.storage.local.get('capyID', (data) => {
    if (data.capyID) {
      capyidInput.value = data.capyID;
    }
  });

  // Save the Capy ID whenever the user changes it
  capyidInput.addEventListener('input', () => {
    const capyIDValue = capyidInput.value.trim();
    chrome.storage.local.set({ capyID: capyIDValue }, () => {
      console.log('Capy ID saved:', capyIDValue);
    });
  });

});

//Capybarago simulating userinput (in browser console only, cross-reference resource sharing (CORS) needs testing)
function simulateUserInput() {
  const gameIDField = document.querySelector('input[placeholder="Enter your Game ID here"]');
  const rewardsCodeField = document.querySelector('input[placeholder="Enter Rewards Code here"]');

  if (gameIDField) {
    gameIDField.value = '9168336';
    gameIDField.dispatchEvent(new Event('input', { bubbles: true }));
  }
  if (rewardsCodeField) {
    rewardsCodeField.value = 'test123';
    rewardsCodeField.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
// Execute the function
simulateUserInput();



  