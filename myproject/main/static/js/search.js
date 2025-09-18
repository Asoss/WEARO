function showOverlay() {
    document.getElementById('searchOverlay').style.display = 'block';
    // document.getElementById('recentSearches').style.display = 'block'; // вимкнено
    // updateRecentList(); // вимкнено
    toggleIcons();
}

function hideOverlay() {
    document.getElementById('searchOverlay').style.display = 'none';
    // document.getElementById('recentSearches').style.display = 'none'; // вимкнено
}

function clearSearch() {
    const input = document.getElementById('searchInput');
    input.value = '';
    toggleIcons();
}

/* saveSearchTerm повністю закоментований
function saveSearchTerm() {
    const input = document.getElementById('searchInput');
    const value = input.value.trim();
    if (value) {
        let recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        if (!recent.includes(value)) {
            recent.unshift(value);
            recent = recent.slice(0, 5);
            localStorage.setItem('recentSearches', JSON.stringify(recent));
        }
    }
}
*/

/* updateRecentList закоментований
function updateRecentList() {
    const list = document.getElementById('searchList');
    list.innerHTML = '';
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    recent.forEach(term => {
        const li = document.createElement('li');
        li.textContent = term;
        li.onclick = () => {
            document.getElementById('searchInput').value = term;
            toggleIcons();
            hideOverlay();
            document.getElementById('filter-form').submit();
        };
        list.appendChild(li);
    });
}
*/

/* clearRecentSearches закоментований
function clearRecentSearches() {
    localStorage.removeItem('recentSearches');
    updateRecentList();
}
*/

function toggleIcons() {
    const input = document.getElementById('searchInput');
    // const clearBtn = document.querySelector('.clear-btn'); // прибрав
    const searchIcon = document.querySelector('.search-icon');

    if (input.value.trim()) {
        // clearBtn.style.display = 'block'; // вимкнено
        searchIcon.style.backgroundColor = '#0077cc';
    } else {
        // clearBtn.style.display = 'none'; // вимкнено
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