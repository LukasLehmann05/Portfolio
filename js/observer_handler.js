const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
}

const optionsSkills = {
    root: null,
    rootMargin: "0px",
    threshold: 0
}

const observer = new IntersectionObserver(handleIntersect, options)
const observerSkills = new IntersectionObserver(handleIntersectLongAnim, optionsSkills)

function handleIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove("fade-init");
            entry.target.classList.add("fade");
            observer.unobserve(entry.target); // stop observing after first reveal
        }
    });
}

function handleIntersectLongAnim(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove("fade-long-init");
            entry.target.classList.add("fade-long");
            observer.unobserve(entry.target); // stop observing after first reveal
        }
    });
}

function observeAll(selector, activeObserver, initialClass) {
    document.querySelectorAll(selector).forEach((element) => {
        element.classList.add(initialClass)
        activeObserver.observe(element)
    })
}

observeAll(".project-card", observer, "fade-init")
observeAll(".contact-section-title", observer, "fade-init")
observeAll(".contact-info", observer, "fade-init")
observeAll(".contact-form", observer, "fade-init")
observeAll(".language-subtext", observerSkills, "fade-init")
observeAll(".feedback-cards", observer, "fade-init")
observeAll(".language-card", observerSkills, "fade-long-init")