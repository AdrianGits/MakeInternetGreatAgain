
document.addEventListener('DOMContentLoaded', function() {
  var godModeOnBtn = document.getElementById('godModeOn');
  var godModeOffBtn = document.getElementById('godModeOff');

  godModeOnBtn.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "activate"}, function(response) {
              console.log('Elements updated');
          });
      });
  });

  godModeOffBtn.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "deactivate"}, function(response) {
              console.log('Elements reverted');
          });
      });
  });
});

//Left menu switch logic
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.leftMenuOption');
    const tabContents = document.querySelectorAll('.tab-content');
  
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
  });

  /* Working Capybarago simulating userinput
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

  */

  