// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === "activate") {
//       // Remove display: none style from all elements
//       document.querySelectorAll('[style*="display: none"]').forEach(function(element) {
//           element.style.display = '';  // Remove the display: none
//       });

//       // Remove disabled attribute from all elements
//       document.querySelectorAll('[disabled]').forEach(function(element) {
//           element.removeAttribute('disabled');  // Remove the disabled attribute
//       });

//       // Remove runtimeConfig_hideBaseQuestion class from all elements except the body
//       document.querySelectorAll('.runtimeConfig_hideBaseQuestion').forEach(function(element) {
//           if (element.tagName.toLowerCase() !== 'body') {
//               element.classList.remove('runtimeConfig_hideBaseQuestion');  // Remove the class
//           }
//       });

//       // Add display: none style to elements with specific classes
//       document.querySelectorAll('.field-popup-wrapper.fieldset-wrapper').forEach(function(element) {
//           element.style.display = 'none';  // Add display: none
//       });

//       sendResponse({status: "Elements updated"});
//   }
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "activate") {
      // Remove display: none style from all elements
      document.querySelectorAll('[style*="display: none"]').forEach(function(element) {
          element.style.display = '';  // Remove the display: none
      });

      // Remove disabled attribute from all elements
      document.querySelectorAll('[disabled]').forEach(function(element) {
          element.removeAttribute('disabled');  // Remove the disabled attribute
      });

      // Remove runtimeConfig_hideBaseQuestion class from all elements except the body
      document.querySelectorAll('.runtimeConfig_hideBaseQuestion').forEach(function(element) {
          if (element.tagName.toLowerCase() !== 'body') {
              element.classList.remove('runtimeConfig_hideBaseQuestion');  // Remove the class
          }
      });

      // Add display: none style to elements with specific classes
      document.querySelectorAll('.field-popup-wrapper.fieldset-wrapper').forEach(function(element) {
          element.style.display = 'none';  // Add display: none
      });

      // Remove warning/timeout expiry elements
      ['expirySessionWarningLock', 'expirySessionWarning'].forEach(function(id) {
          var element = document.getElementById(id);
          if (element) {
              element.remove();  // Delete the element
          }
      });

      // Delete divs with "popupbox" in their class
      document.querySelectorAll('div[class*="popupbox"]').forEach(function(element) {
          element.remove();  // Delete the div
      });

      sendResponse({status: "Elements updated"});
  }

  if (request.action === "deactivate") {
      // Revert changes: add display: none style
      document.querySelectorAll('[style]').forEach(function(element) {
          element.style.display = 'none';  // Add display: none
      });

      // Revert changes: add disabled attribute
      document.querySelectorAll('*:not([disabled])').forEach(function(element) {
          element.setAttribute('disabled', 'true');  // Add disabled attribute
      });

      // Revert changes: add runtimeConfig_hideBaseQuestion class
      document.querySelectorAll('*:not(.runtimeConfig_hideBaseQuestion)').forEach(function(element) {
          if (element.tagName.toLowerCase() !== 'body') {
              element.classList.add('runtimeConfig_hideBaseQuestion');  // Add the class
          }
      });

      // Remove display: none style from specific classes
      document.querySelectorAll('.field-popup-wrapper.fieldset-wrapper').forEach(function(element) {
          element.style.display = '';  // Remove display: none
      });

      sendResponse({status: "Elements reverted"});
  }
});



// SHOW ALL BUTTONS CODE
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === "activate") {
//       // Remove display: none style from specific input, button, select, and textarea elements
//       document.querySelectorAll('input[style*="display: none"], button[style*="display: none"], select[style*="display: none"], textarea[style*="display: none"]').forEach(function(element) {
//           element.style.display = '';  // Remove the display: none
//       });

//       // Remove disabled attribute from input, button, select, and textarea elements
//       document.querySelectorAll('input[disabled], button[disabled], select[disabled], textarea[disabled]').forEach(function(element) {
//           element.removeAttribute('disabled');  // Remove the disabled attribute
//       });

//       // Remove runtimeConfig_hideBaseQuestion class from input, button, select, and textarea elements, except the body
//       document.querySelectorAll('.runtimeConfig_hideBaseQuestion').forEach(function(element) {
//           if (element.tagName.toLowerCase() !== 'body' && (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'button' || element.tagName.toLowerCase() === 'select' || element.tagName.toLowerCase() === 'textarea')) {
//               element.classList.remove('runtimeConfig_hideBaseQuestion');  // Remove the class
//           }
//       });

//       // Add display: none style to elements with specific classes
//       document.querySelectorAll('.field-popup-wrapper.fieldset-wrapper').forEach(function(element) {
//           element.style.display = 'none';  // Add display: none
//       });

//       sendResponse({status: "Elements updated"});
//   }

//   if (request.action === "deactivate") {
//       // Revert changes: add display: none style to input, button, select, and textarea elements
//       document.querySelectorAll('input[style], button[style], select[style], textarea[style]').forEach(function(element) {
//           element.style.display = 'none';  // Add display: none
//       });

//       // Revert changes: add disabled attribute to input, button, select, and textarea elements
//       document.querySelectorAll('input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled])').forEach(function(element) {
//           element.setAttribute('disabled', 'true');  // Add disabled attribute
//       });

//       // Revert changes: add runtimeConfig_hideBaseQuestion class to input, button, select, and textarea elements, except the body
//       document.querySelectorAll('input:not(.runtimeConfig_hideBaseQuestion), button:not(.runtimeConfig_hideBaseQuestion), select:not(.runtimeConfig_hideBaseQuestion), textarea:not(.runtimeConfig_hideBaseQuestion)').forEach(function(element) {
//           if (element.tagName.toLowerCase() !== 'body') {
//               element.classList.add('runtimeConfig_hideBaseQuestion');  // Add the class
//           }
//       });

//       // Remove display: none style from specific classes
//       document.querySelectorAll('.field-popup-wrapper.fieldset-wrapper').forEach(function(element) {
//           element.style.display = '';  // Remove display: none
//       });

//       sendResponse({status: "Elements reverted"});
//   }
// });


