const burgerClosed = "./img/icons/burger_closed.svg"
const burgerOpen = "./img/icons/burger_open.svg"
const burgerMenu = document.getElementById("burger_menu")


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

}