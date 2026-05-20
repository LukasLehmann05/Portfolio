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

function submitContact() {
    if (checkForLegalRequirement()) {
        let name = name_input.value
        let email = email_input.value
        let message = message_input.value

        checkForRequired(name, email, message)
    }
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

    if (email.trim() == "" || !validateEmail(email)) {
        canSubmit = false
        isEmailValid = false
    }

    if (message.trim() == "") {
        canSubmit = false
        isMessageValid = false
    }

    if (!canSubmit) {
        input_section_message.classList.add("invalid-input-height")
        missingInput()
    } else {
        submit(name, email, message)
    }
}

function missingInput() {
    if (!isNameValid) {
        removeWrongInput("name")
        input_section_name.innerHTML += returnWrongInputIcon("name")
        validate_text_name.classList.add("invalid-input")
    }

    if (!isEmailValid) {
        removeWrongInput("email")
        input_section_email.innerHTML += returnWrongInputIcon("email")
        validate_text_email.classList.add("invalid-input")
    }

    if (!isMessageValid) {
        removeWrongInput("message")
        input_section_message.innerHTML += returnWrongInputIcon("message")
        validate_text_message.classList.add("invalid-input")
    }
}

function RemoveInputAlert(id) {
    let alert_to_remove = document.getElementById("icon_" + id)
    if (alert_to_remove) {
        alert_to_remove.remove()
    }
}

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

function clearForm() {
    name_input.value = ""
    email_input.value = ""
    message_input.value = ""
    acceptedGuidlines = false
    toggleSubmitButton(false)
    guidlines_checkbox.classList.remove("checked")
}

function checkForLegalRequirement() {
    if (acceptedGuidlines) {
        toggleSubmitButton(true)
        return true
    } else {
        toggleSubmitButton(false)
        return false
    }
}

function toggleSubmitButton(state) {
    if (state) {
        submit_button.classList.add("can-submit")
    } else if (submit_button.classList.contains("can-submit")) {
        submit_button.classList.remove("can-submit")
    }
}

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

function removeWrongInput(id) {
    document.getElementById("icon_" + id)?.remove()
    document.getElementById("validate_text_" + id)?.classList.remove("invalid-input")

    if (id == "message") {
        document.getElementById("input_section_message").classList.remove("invalid-input-height")
    }
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

function displayResponse() {
    responseOverlay.showModal()
}

function closeResponse() {
    responseOverlay.close()
}