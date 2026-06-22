const burgerClosed = "../img/icons/burger_closed.svg"
const burgerOpen = "../img/icons/burger_opened.svg"
const burgerMenu = document.getElementById("burger_menu")
const header = document.getElementById("header")
const headerContent = document.querySelector(".header-content")
const locationText = document.getElementById("location")
const relocateText = document.getElementById("relocate")
const remoteText = document.getElementById("remote")

const headerBurgerBackground = "linear-gradient(#13074E, #1D0A79F2 95%)";
const headerBackground = "linear-gradient(rgb(11 4 45) 60%, rgb(11 4 45 / 0.5))"


let burgerMenuOpen = false
let isResponsive = false

/**
 * This function toggles the burger menu
 */
function toggleBurgerMenu() {
    if (window.innerWidth <= 950 || burgerMenuOpen) {
        header.classList.toggle("show-burger-nav")
        burgerMenuOpen = !burgerMenuOpen
        burgerMenu.src = burgerMenuOpen ? burgerOpen : burgerClosed
        document.querySelector('header').style.position = burgerMenuOpen ? checkIfScrolled() : "sticky"
        document.querySelector('main').style.marginTop = burgerMenuOpen ? checkForMargin() : "0px"
        document.querySelector('#burger_menu').style.paddingTop = burgerMenuOpen ? "11px" : "0px"
    }
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

function stickyBurger() {
    if (window.scrollY >= 50 && burgerMenuOpen) {
        document.querySelector('header').style.position = "sticky"
    } else {
        document.querySelector('header').style.position = burgerMenuOpen ? "absolute" : "sticky"
    }
}

/**
 * This function checks how much was scrolled so that the style can be changed accordingly.
 * @returns {string} The margin-top value for the main content
 */
function checkForMargin() {
    if (window.scrollY < 50) {
        return "101px"
    } else {
        return "0px"
    }
}

function checkForBurgerClose() {
    if (window.innerWidth > 950 && burgerMenuOpen) {
        toggleBurgerMenu()
    }
}

window.addEventListener("resize", checkForBurgerClose)
window.addEventListener("scroll", stickyBurger)