(function() {
  function autofillFields() {
    chrome.storage.local.get('capyID', (data) => {
      const capyid = data.capyID || 'Enter your Game ID here'; // Use stored Capy ID or default to 'Enter your Game ID here'

      const gameIDField = document.querySelector('input[placeholder="Enter your Game ID here"]');
      const rewardsCodeField = document.querySelector('input[placeholder="Enter Rewards Code here"]');

      if (gameIDField) {
        gameIDField.value = capyid;
        gameIDField.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (rewardsCodeField) {
        rewardsCodeField.value = 'test123';
        rewardsCodeField.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  // Call autofillFields when the content script runs
  autofillFields();

  // Optionally, listen for storage changes to update the fields dynamically
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.capyID) {
      autofillFields();
    }
  });
})();
