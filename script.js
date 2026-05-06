let name_input = document.getElementById("name_input");
let email_input = document.getElementById("email_input");
let message_input = document.getElementById("message_input");
let submit_button = document.getElementById("submit_button");

let validate_text_name = document.getElementById("validate_text_name");
let validate_text_email = document.getElementById("validate_text_email");
let message_section = document.getElementById("message_section");

let canSubmit = false

let isNameValid = false
let isEmailValid = false
let isMessageValid = false

function submitContact() {
    let name = name_input.value
    let email = email_input.value
    let message = message_input.value

    checkForRequired(name, email, message)
}

function resetValidation() {
    isEmailValid = true
    isNameValid = true
    isMessageValid = true
}

function checkForRequired(name, email, message) {
    resetValidation()
    canSubmit = true
    if (name.trim() == "") {
        canSubmit = false
        isNameValid = false
    }

    if (email.trim() == "") {
        canSubmit = false
        isEmailValid = false
    }

    if (message.trim() == "") {
        canSubmit = false
        isMessageValid = false
    }

    if (!canSubmit) {
        missingInput()
    } else {
        submit()
    }
}

function missingInput() {
    if (!isNameValid) {
        validate_text_name.classList.add("invalid-input")
    }

    if (!isEmailValid) {
        validate_text_email.classList.add("invalid-input")
    }

    if (!isMessageValid) {
        message_section.classList.add("invalid-input")
    }
}

function submit() {
    // Your submit logic here
}