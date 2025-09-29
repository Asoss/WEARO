document.addEventListener('DOMContentLoaded', function () {
    const translations = {
        uk: {
            // Пошук
            searchPlaceholder: 'Пошук',
            searchAlt: 'Пошук',

            // Секції
            uniqueCollections: 'УНІКАЛЬНІ КОЛЕКЦІЇ',
            recentlyViewed: 'НЕЩОДАВНО ПЕРЕГЛЯНУТІ',
            lookingForMore: 'ШУКАЄТЕ БІЛЬШЕ ВАРІАНТІВ?',

            // Hero секція
            controlTrends: 'Керуй трендами',
            createOwnStyle: 'СТВОРИ СВІЙ ВЛАСНИЙ СТИЛЬ',
            selectClothing: 'Підібрати одяг',

            // Кнопки опцій
            womenJeans: 'Жіночі джинси',
            womenShorts: 'Жіночі шорти',
            womenPants: 'Жіночі штани',
            womenTopsBlouses: 'Жіночі топи, блузки та сорочки',
            womenStraightJeans: 'Жіночі джинси з прямими штанинами',
            womenLooseJeans: 'Жіночі вільні та мішкуваті джинси',

            // Alt тексти
            noPhoto: 'Немає фото'
        },
        en: {
            // Search
            searchPlaceholder: 'Search',
            searchAlt: 'Search',

            // Sections
            uniqueCollections: 'UNIQUE COLLECTIONS',
            recentlyViewed: 'RECENTLY VIEWED',
            lookingForMore: 'LOOKING FOR MORE OPTIONS?',

            // Hero section
            controlTrends: 'Control the trends',
            createOwnStyle: 'CREATE YOUR OWN STYLE',
            selectClothing: 'Select clothing',

            // Option buttons
            womenJeans: "Women's Jeans",
            womenShorts: "Women's Shorts",
            womenPants: "Women's Pants",
            womenTopsBlouses: "Women's Tops, Blouses & Shirts",
            womenStraightJeans: "Women's Straight Leg Jeans",
            womenLooseJeans: "Women's Loose & Baggy Jeans",

            // Alt texts
            noPhoto: 'No photo'
        }
    };

    function translateHomePage(lang) {
        const t = translations[lang];

        // Пошук
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = t.searchPlaceholder;
        }

        const searchButton = document.querySelector('.search-icon img');
        if (searchButton) {
            searchButton.alt = t.searchAlt;
        }

        // Заголовки секцій
        const sectionTitles = document.querySelectorAll('.section-title');
        if (sectionTitles[0]) sectionTitles[0].textContent = t.uniqueCollections;
        if (sectionTitles[1]) sectionTitles[1].textContent = t.recentlyViewed;
        if (sectionTitles[2]) sectionTitles[2].textContent = t.lookingForMore;

        // Hero overlay текст
        const smallText = document.querySelector('.small-text');
        if (smallText) smallText.textContent = t.controlTrends;

        const bigText = document.querySelector('.big-text');
        if (bigText) bigText.textContent = t.createOwnStyle;

        const linkText = document.querySelector('.link-text');
        if (linkText) linkText.textContent = t.selectClothing;

        // Кнопки опцій
        const optionButtons = document.querySelectorAll('.option-btn');
        const buttonTexts = [
            t.womenJeans,
            t.womenShorts,
            t.womenPants,
            t.womenTopsBlouses,
            t.womenStraightJeans,
            t.womenLooseJeans
        ];

        optionButtons.forEach((btn, index) => {
            if (buttonTexts[index]) {
                btn.textContent = buttonTexts[index];
            }
        });

        // Alt для зображень без фото
        const noPhotoImgs = document.querySelectorAll('img[alt="Немає фото"], img[alt="No photo"]');
        noPhotoImgs.forEach(img => {
            img.alt = t.noPhoto;
        });
    }

    // Слухач для зміни мови
    window.addEventListener('languageChanged', function (e) {
        translateHomePage(e.detail.language);
    });

    // Перевірка збереженої мови
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'uk';
    if (savedLanguage !== 'uk') {
        translateHomePage(savedLanguage);
    }

    // Додатково: слухач для селектора мови (якщо він є на сторінці)
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        const observer = new MutationObserver(function () {
            const currentLang = localStorage.getItem('selectedLanguage') || 'uk';
            translateHomePage(currentLang);
        });

        observer.observe(languageSelector, {
            attributes: true,
            childList: true,
            subtree: true
        });
    }
});