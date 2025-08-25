function showOverlay() {
    document.getElementById('searchOverlay').style.display = 'block';
    document.getElementById('recentSearches').style.display = 'block';
    updateRecentList();
    toggleIcons();
}

function hideOverlay() {
    document.getElementById('searchOverlay').style.display = 'none';
    document.getElementById('recentSearches').style.display = 'none';
}

function clearSearch() {
    const input = document.getElementById('searchInput');
    input.value = '';
    toggleIcons();
}

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


function clearRecentSearches() {
    localStorage.removeItem('recentSearches');
    updateRecentList();
}

function toggleIcons() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.querySelector('.clear-btn');
    const searchIcon = document.querySelector('.search-icon');

    if (input.value.trim()) {
        clearBtn.style.display = 'block';
        searchIcon.style.backgroundColor = '#0077cc';
    } else {
        clearBtn.style.display = 'none';
        searchIcon.style.backgroundColor = 'white';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    if (input) {
        input.addEventListener('input', toggleIcons);
    }
});