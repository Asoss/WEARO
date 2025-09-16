function createOverlay() {
    const overlay = document.createElement('div')
    overlay.className = 'page-overlay'
    document.body.appendChild(overlay)
    return overlay
}

document.addEventListener('DOMContentLoaded', function () {
    const overlay = createOverlay()
    const dropdowns = document.querySelectorAll('.dropdown')

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('mouseenter', function () {
            overlay.classList.add('active')
        })

        dropdown.addEventListener('mouseleave', function () {
            setTimeout(() => {
                const isHoveringAnyDropdown = Array.from(dropdowns).some((dd) => dd.matches(':hover'))
                if (!isHoveringAnyDropdown) {
                    overlay.classList.remove('active')
                }
            }, 50)
        })
    })

    overlay.addEventListener('click', function () {
        overlay.classList.remove('active')
    })
})