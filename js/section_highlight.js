let allSections = document.querySelectorAll('[id*="highlight"]')

/**
 * This function checks the current view of the user and highlights the corresponding section in the navigation bar
 */
function checkCurrentScroll() {
    let scrollY = window.scrollY

    allSections.forEach(element => {
        let sectionPos = element.getBoundingClientRect()
        let currentOffset = window.innerHeight / 2 + scrollY
        let elementID = element.id
        let filtered_element = elementID.replace("highlight", "").trim()
        
        if (currentOffset >= sectionPos.top + scrollY && currentOffset <= sectionPos.bottom + scrollY) {
            document.getElementById(`nav_${filtered_element}`).classList.add('current-focus')
        } else {
            document.getElementById(`nav_${filtered_element}`).classList.remove('current-focus')
        }
    })
}

window.addEventListener('scroll', checkCurrentScroll)
