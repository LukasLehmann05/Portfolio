const burgerClosed = "./img/icons/burger_closed.svg"
const burgerOpen = "./img/icons/burger_opened.svg"
const burgerMenu = document.getElementById("burger_menu")
const nav_bar = document.getElementById("nav_bar")
const burgerIconAlignTop = "flex-start"
const burgerIconAlignCenter = "center"
const headerContent = document.querySelector(".header-content")
const locationText = document.getElementById("location")
const relocateText = document.getElementById("relocate")
const remoteText = document.getElementById("remote")

let burgerMenuOpen = false
let isResponsive = false

/**
 * The init function gets called when the page loads
 */
function init() {
    checkPreferedLanguage()
}

/**
 * This function checks the users prefered language, if it is not german, the user gets redirected to the english version of the website
 */
function checkPreferedLanguage() {
    let userLang = navigator.language

    if (!userLang.startsWith("de")) {
        location.href = "en/index_en.html"
    }
}

function toggleBurgerMenu() {
    nav_bar.classList.toggle("show-burger-nav")
    burgerMenuOpen = !burgerMenuOpen
    burgerMenu.src = burgerMenuOpen ? burgerOpen : burgerClosed
    headerContent.style.alignItems = burgerMenuOpen ? burgerIconAlignTop : burgerIconAlignCenter
}

function toggleAboutText() {
    if (window.innerWidth <= 1350 ) {
        if (document.documentElement.lang == "de") {
            toggleAboutTextDE(true)
        } else {
            toggleAboutTextEN(true)
        }
    } else {
        if (document.documentElement.lang == "de") {
            toggleAboutTextDE(false)
        } else {
            toggleAboutTextEN(false)
        }
    }

}

function toggleAboutTextDE(state) {
    if (state == false) {
        locationText.innerHTML = returnLocationTextDE()
        relocateText.innerHTML = returnRelocateTextDE()
        remoteText.innerHTML = returnRemoteTextDE()
    } else {
        locationText.innerText = returnLocationResponsiveTextDE()
        relocateText.innerText = returnRelocateResponsiveTextDE()
        remoteText.innerText = returnRemoteResponsiveTextDE()
    }
}

function toggleAboutTextEN(state) {
    if (state == false) {
        locationText.innerHTML = returnLocationText()
        relocateText.innerHTML = returnRelocateText()
        remoteText.innerHTML = returnRemoteText()
    } else {
        locationText.innerText = returnLocationResponsiveText()
        relocateText.innerText = returnRelocateResponsiveText()
        remoteText.innerText = returnRemoteResponsiveText()
    }
}

window.addEventListener("resize", toggleAboutText)
window.addEventListener("load", toggleAboutText)