chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "activate") {
        // Remove display: none style from all elements
        document.querySelectorAll('[style]').forEach(function (element) {
            if (/display\s*:\s*none\s*;?/i.test(element.style.cssText)) {
                element.style.display = '';  // Remove the display: none
            }
        });

        // Remove disabled attribute from all elements
        document.querySelectorAll('[disabled]').forEach(function (element) {
            element.removeAttribute('disabled');  // Remove the disabled attribute
        });

        // Remove runtimeConfig_hideBaseQuestion class from all elements except the body
        document.querySelectorAll('.runtimeConfig_hideBaseQuestion').forEach(function (element) {
            if (element.tagName.toLowerCase() !== 'body') {
                element.classList.remove('runtimeConfig_hideBaseQuestion');  // Remove the class
            }
        });

        // Add display: none style to elements with specific classes
        document.querySelectorAll('.field-popup-wrapper.fieldset-wrapper').forEach(function (element) {
            element.style.display = 'none';  // Add display: none
        });

        // Remove warning/timeout expiry elements from blocking the screen
        ['expirySessionWarningLock', 'expirySessionWarning'].forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.remove();  // Delete the element
            }
        });

        // Delete divs with "popupbox" in their class
        document.querySelectorAll('div[class*="popupbox"]').forEach(function (element) {
            element.remove();  // Delete the div
        });

        sendResponse({ status: "Elements updated" });
    }

    if (request.action === "deactivate") {
        // Do nothing for deactivate
        sendResponse({ status: "Deactivation does nothing" });
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

        sendResponse({ status: "Autofill CEP activated" });
    }

    if (request.action === "deactivateAutofillCep") {
        console.log('Deactivate Autofill CEP action received');
        // Do nothing for deactivate Autofill CEP
        sendResponse({ status: "Deactivation Autofill CEP does nothing" });
    }


    // Step 1 insertion
    if (request.action === "autofillEntDemo") {
        console.log('Autofill ENT Demo action received');

        // Set the radio button to "No"
        const FFBOOL041 = document.getElementById('Summary2-EditOpen3_FFBOOL041_No');
        if (FFBOOL041) {
            FFBOOL041.checked = true;  // Set the radio button to "No"
            console.log('ENT field set to "No"');
            FFBOOL041.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
        }
        const FFDDWN009 = document.getElementById('Summary2-EditOpen3_FFDDWN009');
        if (FFDDWN009) {
            FFDDWN009.value = "FFDDW000039";  // Set the value to "0 - 25,000"
            console.log('Dropdown field set to "0 - 25,000"');
            FFDDWN009.dispatchEvent(new Event('change', { bubbles: true }));  // Trigger change event if needed
        }
        const FFDDWN0012 = document.getElementById('Summary2-EditOpen3_FFDDWN0012');
        if (FFDDWN0012) {
            FFDDWN0012.value = "FFDDW000005"; // Value corresponding to "Annually"
            console.log('ENT dropdown field set to "Annually"');
            FFDDWN0012.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const FFDDWN0062 = document.getElementById('Summary2-EditOpen3_FFDDWN0062');
        if (FFDDWN0062) {
            FFDDWN0062.value = "FFDDW000006";  // Set the value to "Quarterly"
            console.log('ENT third select field set to "Quarterly"');
            FFDDWN0062.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const FFBOOL036 = document.getElementById('Summary2-EditOpen3_FFBOOL036_No');
        if (FFBOOL036) {
            FFBOOL036.checked = true;
            console.log('Email filtration & scanning tool field set to "No"');
            FFBOOL036.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const FFDDWN007 = document.getElementById('Summary2-EditOpen3_FFDDWN007');
        if (FFDDWN007) {
            FFDDWN007.value = "FFDDW000035";  // Set the value to "Yes, EDR covers 100%"
            console.log('FFDDWN007 field set to "Yes, EDR covers 100%"');
            FFDDWN007.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const FFDDWN008 = document.getElementById('Summary2-EditOpen3_FFDDWN008');
        if (FFDDWN008) {
            FFDDWN008.value = "FFDDW000037";  // Set the value to "Yes but EDR covers less than 90%"
            console.log('FFDDWN008 field set to "Yes but EDR covers less than 90%"');
            FFDDWN008.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const FFDDWN0032 = document.getElementById('Summary2-EditOpen3_FFDDWN0032');
        if (FFDDWN0032) {
            FFDDWN0032.value = "FFDDW000014";  // Set the value to "Daily"
            console.log('FFDDWN0032 field set to "Daily"');
            FFDDWN0032.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const FFDDWN0102 = document.getElementById('Summary2-EditOpen3_FFDDWN0102');
        if (FFDDWN0102) {
            FFDDWN0102.value = "FFDDW000054";  // Set the value to "Monthly"
            console.log('FFDDWN010 field set to "Monthly"');
            FFDDWN0102.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const DRPANNUAL = document.getElementById('Summary2-EditOpen3_NewBlock52_b5b1c32bd2d44555be67ba48b5f84287__item_TestedAnnually');
        if (DRPANNUAL) {
            DRPANNUAL.checked = true;
            console.log('Checkbox for "Tested Annually?" set to true');
            DRPANNUAL.dispatchEvent(new Event('change', { bubbles: true }));
        }
        // const BCPINPLACE = document.getElementById('Summary2-EditOpen3_NewBlock52_bc92167d14134af292f4704f45d2aa52__item_InPlace');
        // if (BCPINPLACE) {
        //     BCPINPLACE.checked = true;
        //     console.log('BCP In Place checkbox set to true');
        //     BCPINPLACE.dispatchEvent(new Event('change', { bubbles: true }));
        // }
        const BCPANNUAL = document.getElementById('Summary2-EditOpen3_NewBlock52_bc92167d14134af292f4704f45d2aa52__item_TestedAnnually');
        if (BCPANNUAL) {
            BCPANNUAL.checked = true;
            console.log('BCP Tested Annually checkbox set to true');
            BCPANNUAL.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const IRPANNUAL = document.getElementById('Summary2-EditOpen3_NewBlock52_6f0b1aed759949668a808a03132867a3__item_TestedAnnually');
        if (IRPANNUAL) {
            IRPANNUAL.checked = true;
            console.log('IRP In Place checkbox set to true');
            IRPANNUAL.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const FFBOOL0132_No = document.getElementById('Summary2-EditOpen3_FFBOOL0132_No');
        if (FFBOOL0132_No) {
            FFBOOL0132_No.checked = true;
            console.log('Radio button for FFBOOL0132 set to "No"');
            FFBOOL0132_No.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const FFBOOL0172_No = document.getElementById('Summary2-EditOpen3_FFBOOL0172_No');
        if (FFBOOL0172_No) {
            FFBOOL0172_No.checked = true;
            console.log('Radio button for FFBOOL0172 set to "No"');
            FFBOOL0172_No.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // Function to check all "Tested Annually?" checkboxes
        function checkTestedAnnuallyCheckboxes() {
            // Use MutationObserver to handle dynamic content loading
            const observer = new MutationObserver((mutations, obs) => {
                const testedAnnuallyCheckboxes = document.querySelectorAll('input[type="checkbox"][table-field-name="TestedAnnually"]');

                if (testedAnnuallyCheckboxes.length > 0) {
                    obs.disconnect();

                    // Check "Tested Annually?" checkboxes
                    testedAnnuallyCheckboxes.forEach(checkbox => {
                        checkbox.checked = true;
                        checkbox.dispatchEvent(new Event('input', { bubbles: true }));
                        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                        console.log('Checked a "Tested Annually?" checkbox.');
                    });
                }
            });

            observer.observe(document, {
                childList: true,
                subtree: true
            });

            // Fallback in case the checkboxes are already loaded
            const testedAnnuallyCheckboxesNow = document.querySelectorAll('input[type="checkbox"][table-field-name="TestedAnnually"]');
            if (testedAnnuallyCheckboxesNow.length > 0) {
                observer.disconnect();

                testedAnnuallyCheckboxesNow.forEach(checkbox => {
                    checkbox.checked = true;
                    checkbox.dispatchEvent(new Event('input', { bubbles: true }));
                    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                    console.log('Checked a "Tested Annually?" checkbox.');
                });
            }
        }

        // Call the function to check all "Tested Annually?" checkboxes
        checkTestedAnnuallyCheckboxes();




        sendResponse({ status: "Autofill ENT Demo activated" });
    }










});





