function init() {
    checkPreferedLanguage()
}

function checkPreferedLanguage() {
    let userLang = navigator.language
    console.log(userLang);
    
    if (!userLang.startsWith("de")) {
        location.href = "en/index_en.html"
    }   
}