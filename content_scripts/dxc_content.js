chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "activate") {
        // Remove display: none style from all elements
        document.querySelectorAll('[style]').forEach(function(element) {
            if (/display\s*:\s*none\s*;?/i.test(element.style.cssText)) {
                element.style.display = '';  // Remove the display: none
            }
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

        // Remove warning/timeout expiry elements from blocking the screen
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
        // Do nothing for deactivate
        sendResponse({status: "Deactivation does nothing"});
    }

    if (request.action === "activateAutofillCep") {
        console.log('Autofill CEP action received');
        // Find the select element by its ID
        const FFDDWN0012 = document.getElementById('Summary2-EditOpen3_FFDDWN0012');
        if (FFDDWN0012) {
            FFDDWN0012.value = "FFDDW000005";  // Set the value to "Annually"
            console.log('Dropdown value set to "Annually"');
            FFDDWN0012.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
        }
        const FFDDWN0032 = document.getElementById('Summary2-EditOpen3_FFDDWN0032');
        if (FFDDWN0032) {
            FFDDWN0032.value = "FFDDW000014";  // Set the value to "Daily"
            console.log('Dropdown 2 value set to "Daily"');
            FFDDWN0032.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
        }
        const FFBOOL0132 = document.getElementById('Summary2-EditOpen3_FFBOOL0132_No');
        if (FFBOOL0132) {
            FFBOOL0132.checked = true;
            console.log('Radio button set to "Yes"');
            FFBOOL0132.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
        }
        // Prefill the second radio button field to "Yes" and text field if Yes is selected
        const FFBOOL0172 = document.getElementById('Summary2-EditOpen3_FFBOOL0172');
        const FFBOOL0172_No = document.getElementById('Summary2-EditOpen3_FFBOOL0172_No');
        const textField = document.getElementById('Summary2-EditOpen3_FFTEXT0022');
        if (FFBOOL0172 && textField) {
            FFBOOL0172.checked = true;
            textField.value = "This is some text to fill in this mandatory field."; 
            console.log('Radio button set to "Yes" and text field filled with "test"');
            FFBOOL0172.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
            textField.dispatchEvent(new Event('input', { bubbles: true }));  // Trigger input event if needed
        } else if (FFBOOL0172_No) {
            FFBOOL0172_No.checked = true;
            console.log('Radio button set to "No"');
            FFBOOL0172_No.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
        }
        const FFDDWN015 = document.getElementById('Summary2-EditOpen3_FFDDWN015');
        if (FFDDWN015) {
            FFDDWN015.value = "FFDDW000059";  // Set the value to "No"
            console.log('Dropdown 3 value set to "No"');
            FFDDWN015.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
        }
        const FFDDWN018 = document.getElementById('Summary2-EditOpen3_FFDDWN018');
        if (FFDDWN018) {
            FFDDWN018.value = "FFDDW000059";  // Set the value to "No"
            console.log('Dropdown 3 value set to "No"');
            FFDDWN018.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
        }
        const FFDDWN017 = document.getElementById('Summary2-EditOpen3_FFDDWN017');
        if (FFDDWN017) {
            FFDDWN017.value = "FFDDW000059";  // Set the value to "No"
            console.log('Dropdown 3 value set to "No"');
            FFDDWN017.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
        }
        const FFDDWN012 = document.getElementById('Summary2-EditOpen3_FFDDWN012');
        if (FFDDWN012) {
            FFDDWN012.value = "FFDDW000059";  // Set the value to "No"
            console.log('Dropdown 3 value set to "No"');
            FFDDWN012.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
        }
        
        sendResponse({status: "Autofill CEP activated"});
    }

    if (request.action === "deactivateAutofillCep") {
        console.log('Deactivate Autofill CEP action received');
        // Do nothing for deactivate Autofill CEP
        sendResponse({status: "Deactivation Autofill CEP does nothing"});
    }
});

