const burgerClosed = "../img/icons/burger_closed.svg"
const burgerOpen = "../img/icons/burger_opened.svg"
const burgerMenu = document.getElementById("burger_menu")
const nav_bar = document.getElementById("nav_bar")
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

/**
 * This function toggles the burger menu
 */
function toggleBurgerMenu() {
    nav_bar.classList.toggle("show-burger-nav")
    burgerMenuOpen = !burgerMenuOpen
    burgerMenu.src = burgerMenuOpen ? burgerOpen : burgerClosed
    headerContent.style.alignItems = burgerMenuOpen ? "flex-start" : "center"
    document.querySelector('header').style.position = burgerMenuOpen ? checkIfScrolled() : "sticky"
    document.querySelector('main').style.marginTop = burgerMenuOpen ? checkForMargin() : "0px"
    document.querySelector('#burger_menu').style.paddingTop = burgerMenuOpen ? "11px" : "0px"
    
}

/**
 * This function checks how much was scrolled so that the style can be changed accordingly.
 * @returns {string} The position of the header, either "absolute" or "sticky"
 */
function checkIfScrolled() {
    if (window.scrollY <= 50) {
        return "absolute"
    } else {
        return "sticky"
    }
}

/**
 * This function checks how much was scrolled so that the style can be changed accordingly.
 * @returns {string} The margin-top value for the main content
 */
function checkForMargin() {
    if (window.scrollY <= 50) {
        return "101px"
    } else {
        return "0px"
    }
}