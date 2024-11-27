// document.addEventListener('DOMContentLoaded', function() {
//   var godModeOnBtn = document.getElementById('godModeOn');

//   godModeOnBtn.addEventListener('click', function() {
//       chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//           chrome.tabs.sendMessage(tabs[0].id, {action: "activate"}, function(response) {
//               console.log('Elements updated');
//           });
//       });
//   });
// });

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

