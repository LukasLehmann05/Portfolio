const name_input = document.getElementById("name_input");
const email_input = document.getElementById("email_input");
const message_input = document.getElementById("message_input");
const submit_button = document.getElementById("submit_button");

const guidlines_checkbox = document.getElementById("guidlines_checkbox");
const responseOverlay = document.getElementById("response_overlay")

const input_section_name = document.getElementById("input_section_name");
const input_section_email = document.getElementById("input_section_email");
const input_section_message = document.getElementById("input_section_message");
const validate_text_name = document.getElementById("validate_text_name");
const validate_text_email = document.getElementById("validate_text_email");
const validate_text_message = document.getElementById("validate_text_message");

let canSubmit = false

let isNameValid = false
let isEmailValid = false
let isMessageValid = false

let acceptedGuidlines = false

/**
 * Appends a validation icon to the target input section without parsing HTML strings
 * @param {HTMLElement} target - The input section container
 * @param {string} id - The field id suffix used for icon id
 * @param {boolean} isCorrect - Whether to show the correct or wrong icon
 */
function appendFeedbackIcon(target, id, isCorrect) {
    const icon = document.createElement("img")
    icon.src = isCorrect ? "../img/icons/correct.svg" : "../img/icons/attention.svg"
    icon.className = "input-feedback"
    icon.alt = isCorrect ? "correct input" : "wrong input"
    icon.id = "icon_" + id
    target.appendChild(icon)
}

/**
 * This function gets called when the user clicks the submit button, and checks for all requirements
 */
function submitContact() {
    if (checkForLegalRequirement()) {
        let name = name_input.value
        let email = email_input.value
        let message = message_input.value

        checkForRequired(name, email, message)
    }
}

/**
 * This function resets the validation state of all inputs
 */
function resetValidation() {
    isEmailValid = true
    isNameValid = true
    isMessageValid = true
    canSubmit = true
}

/**
 * This function checks if all fields are filled and if the content is valid
 */
function checkForRequired(name, email, message) {
    resetValidation()
    checkName(name)
    checkEmail(email)
    checkMessage(message)
    if (canSubmit) {
        submit(name, email, message)
    }
}

/**
 * This function checks if the message is valid, and if not, it sets the validation state to false and displays the wrong input alert
 * @param {string} message - The message of the user
 */
function checkName(name) {
    if (!validateName(name)) {
        isNameValid = false
        canSubmit = false
        missingName()
    } else {
        removeWrongInput("name")
        appendFeedbackIcon(input_section_name, "name", true)
    }
}

/**
 * This function checks if the email is valid, and if not, it sets the validation state to false and displays the wrong input alert
 * @param {string} email - The email of the user
 */
function checkEmail(email) {
    if (!validateEmail(email)) {
        isEmailValid = false
        canSubmit = false
        missingEmail()
    } else {
        removeWrongInput("email")
        appendFeedbackIcon(input_section_email, "email", true)
    }
}

/**
 * This function checks if the message is valid, and if not, it sets the validation state to false and displays the wrong input alert
 * @param {string} message - The message of the user
 */
function checkMessage(message) {
    if (!validateMessage(message)) {
        isMessageValid = false
        canSubmit = false
        missingMessage()
    } else {
        removeWrongInput("message")
        appendFeedbackIcon(input_section_message, "message", true)
    }
}

/**
 * This function displays the wrong input alert for the name input field
 */
function missingName() {
    if (!isNameValid) {
        removeWrongInput("name")
        appendFeedbackIcon(input_section_name, "name", false)
        validate_text_name.classList.add("invalid-input")
    }
}

/**
 * This function displays the wrong input alert for the email input field
 */
function missingEmail() {
    if (!isEmailValid) {
        removeWrongInput("email")
        appendFeedbackIcon(input_section_email, "email", false)
        validate_text_email.classList.add("invalid-input")
        input_section_message.classList.add("invalid-input-height")
    }
}

/**
 * This function displays the wrong input alert for the message input field
 */
function missingMessage() {
    if (!isMessageValid) {
        removeWrongInput("message")
        appendFeedbackIcon(input_section_message, "message", false)
        validate_text_message.classList.add("invalid-input")
    }
}

/**
 * This function handles the POST request to the server with the user input
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} message - The message of the user
 */
async function submit(name, email, message) {
    try {
        const response = await fetch("php/contact.php", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });

        if (response.ok) {
            displayResponse()
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }

    await clearForm()
}

/**
 * This function clears the form and resets all values to default
 */
function clearForm() {
    name_input.value = ""
    email_input.value = ""
    message_input.value = ""
    acceptedGuidlines = false
    toggleSubmitButton(false)
    guidlines_checkbox.classList.remove("checked")
    resetValidation()
    removeWrongInput("name")
    removeWrongInput("email")
    removeWrongInput("message")
}

/**
 * This function checks if the user has accepted the legal requirements
 */
function checkForLegalRequirement() {
    if (acceptedGuidlines) {
        toggleSubmitButton(true)
        return true
    } else {
        toggleSubmitButton(false)
        return false
    }
}

/**
 * This function toggles the submit button depending on the state of the guidlines checkbox
 * @param {boolean} state - The state of the guidlines checkbox
 */
function toggleSubmitButton(state) {
    if (state) {
        submit_button.classList.add("can-submit")
    } else if (submit_button.classList.contains("can-submit")) {
        submit_button.classList.remove("can-submit")
    }
}

/**
 * This function toggles the state of the guidelines checkbox
 */
function toggleCheck() {
    if (guidlines_checkbox.classList.contains("checked")) {
        guidlines_checkbox.classList.remove("checked")
        acceptedGuidlines = false
        checkForLegalRequirement()
    } else {
        guidlines_checkbox.classList.add("checked")
        acceptedGuidlines = true
        checkForLegalRequirement()
    }
}

/**
 * This function removes the wrong input alert for a specific input field
 * @param {string} id - The id of the input field to remove the alert from
 */
function removeWrongInput(id) {
    document.getElementById("icon_" + id)?.remove()
    document.getElementById("validate_text_" + id)?.classList.remove("invalid-input")

    if (id == "email") {
        document.getElementById("input_section_message").classList.remove("invalid-input-height")
    }
}

/**
 * This function checks if the mail of the user is valid 
 * @param {string} email - The email of the user
 * @returns {boolean} - Returns true if the email is valid, false otherwise
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^.\s@]+\.[^.\s@]+$/
    return regex.test(email)
}

/**
 * This function checks if the name of the user is valid 
 * @param {string} name - The name of the user
 * @returns {boolean} - Returns true if the name is valid, false otherwise
 */
function validateName(name) {
    return name.trim() !== "" && name.length >= 2
}

/**
 * This function checks if the message of the user is valid 
 * @param {string} message - The message of the user
 * @returns {boolean} - Returns true if the message is valid, false otherwise
 */
function validateMessage(message) {
    return message.trim() !== "" && message.length >= 5
}


/**
 * Displays the response overlay
 */
function displayResponse() {
    responseOverlay.showModal()
    setTimeout(() => {
        responseOverlay.close()
    }, 4000)
}

/**
 * Closes the response overlay
 */
function closeResponse() {
    responseOverlay.close()
}