const burgerClosed = "./img/icons/burger_closed.svg"
const burgerOpen = "./img/icons/burger_opened.svg"
const burgerMenu = document.getElementById("burger_menu")
const nav_bar = document.getElementById("nav_bar")
const burgerIconAlignTop = "flex-start"
const burgerIconAlignCenter = "center"
const headerContent = document.querySelector(".header-content")

let burgerMenuOpen = false

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