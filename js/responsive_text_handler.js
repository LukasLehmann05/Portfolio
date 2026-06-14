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