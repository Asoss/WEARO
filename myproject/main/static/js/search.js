function showOverlay() {
    document.getElementById('searchOverlay').style.display = 'block';
    toggleIcons();
}

function hideOverlay() {
    document.getElementById('searchOverlay').style.display = 'none';
}

function clearSearch() {
    const input = document.getElementById('searchInput');
    input.value = '';
    toggleIcons();
}

function toggleIcons() {
    const input = document.getElementById('searchInput');
    const searchIcon = document.querySelector('.search-icon');

    if (input.value.trim()) {
        searchIcon.style.backgroundColor = '#0077cc';
    } else {
        searchIcon.style.backgroundColor = 'white';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    if (input) {
        input.addEventListener('input', toggleIcons);
    }

    // робимо нечутливим до регістру
    const form = document.getElementById('filter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const field = document.getElementById('searchInput');
            field.value = field.value.trim();
        });
    }
});