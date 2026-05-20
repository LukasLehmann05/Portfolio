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
    console.log(userLang);
    
    if (!userLang.startsWith("de")) {
        location.href = "en/index_en.html"
    }   
}