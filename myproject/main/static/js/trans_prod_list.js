document.addEventListener('DOMContentLoaded', function () {
    const translations = {
        uk: {
            searchPlaceholder: 'Пошук',
            searchAlt: 'Пошук',
            home: 'Головна',
            jeans: 'ДЖИНСИ',
            pants: 'ШТАНИ',
            sweatersAndSweatshirts: 'СВЕТРИ ТА СВІТШОТИ',
            topsAndTshirts: 'ТОПИ ТА ФУТБОЛКИ',
            tshirts: 'ФУТБОЛКИ',
            filters: 'Фільтри',
            price: 'Ціна',
            from: 'Від',
            to: 'до',
            size: 'Розмір',
            length: 'Довжина',
            generalAppearance: 'Загальний вид товару',
            colors: 'Кольори',
            stretchiness: 'Розтяжність',
            pattern: 'Візерунок',
            salesStraight: 'Розпродажені прямий',
            looseStraight: 'Вільний прямий',
            relaxedFit: 'Розслаблена прилич',
            baggy: 'Мішковина',
            straight: 'Прямий',
            loose: 'Вільний',
            blue: 'Синій',
            cream: 'Кремовий',
            brown: 'Коричневий',
            orange: 'Оранжевий',
            red: 'Червоний',
            yellow: 'Жовтий',
            green: 'Зелений',
            gray: 'Сірий',
            purple: 'Фіолетовий',
            lightBlue: 'Блакитний',
            white: 'Білий',
            black: 'Чорний',
            high: 'Висока',
            medium: 'Середня',
            low: 'Низька',
            none: 'Відсутній',
            striped: 'Смугастий',
            checkered: 'Клітинка',
            floral: 'Квітковий',
            other: 'Інший',
            addToCart: 'Додати в кошик',
            reviews: 'відгуків',
            noProducts: 'Немає товарів'
        },
        en: {
            searchPlaceholder: 'Search',
            searchAlt: 'Search',
            home: 'Home',
            jeans: 'JEANS',
            pants: 'PANTS',
            sweatersAndSweatshirts: 'SWEATERS & SWEATSHIRTS',
            topsAndTshirts: 'TOPS & T-SHIRTS',
            tshirts: 'T-SHIRTS',
            filters: 'Filters',
            price: 'Price',
            from: 'From',
            to: 'to',
            size: 'Size',
            length: 'Length',
            generalAppearance: 'General Appearance',
            colors: 'Colors',
            stretchiness: 'Stretchiness',
            pattern: 'Pattern',
            salesStraight: 'Sales Straight',
            looseStraight: 'Loose Straight',
            relaxedFit: 'Relaxed Fit',
            baggy: 'Baggy',
            straight: 'Straight',
            loose: 'Loose',
            blue: 'Blue',
            cream: 'Cream',
            brown: 'Brown',
            orange: 'Orange',
            red: 'Red',
            yellow: 'Yellow',
            green: 'Green',
            gray: 'Gray',
            purple: 'Purple',
            lightBlue: 'Light Blue',
            white: 'White',
            black: 'Black',
            high: 'High',
            medium: 'Medium',
            low: 'Low',
            none: 'None',
            striped: 'Striped',
            checkered: 'Checkered',
            floral: 'Floral',
            other: 'Other',
            addToCart: 'Add to Cart',
            reviews: 'reviews',
            noProducts: 'No products'
        }
    };

    function translateFiltersPage(lang) {
        const t = translations[lang];

        // Пошук
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.placeholder = t.searchPlaceholder;

        const searchButton = document.querySelector('.search-icon img');
        if (searchButton) searchButton.alt = t.searchAlt;

        // Breadcrumb
        const breadcrumbHome = document.querySelector('.breadcrumb a');
        if (breadcrumbHome) breadcrumbHome.textContent = t.home;

        // Категорії
        const categories = document.querySelectorAll('.category p');
        categories.forEach(cat => {
            const text = cat.textContent.trim();
            if (text === 'ДЖИНСИ' || text === 'JEANS') {
                cat.textContent = t.jeans;
            } else if (text === 'ШТАНИ' || text === 'PANTS') {
                cat.textContent = t.pants;
            } else if (text.includes('СВЕТРИ') || text.includes('SWEATERS')) {
                cat.textContent = t.sweatersAndSweatshirts;
            } else if (text.includes('ТОПИ') || text.includes('TOPS')) {
                cat.textContent = t.topsAndTshirts;
            } else if (text === 'ФУТБОЛКИ' || text === 'T-SHIRTS') {
                cat.textContent = t.tshirts;
            }
        });

        // Заголовок фільтрів - ВИПРАВЛЕНО
        const filtersHeader = document.querySelector('.filters-header');
        if (filtersHeader) {
            // Знаходимо текстовий вузол (не тег)
            const textNodes = Array.from(filtersHeader.childNodes).filter(node =>
                node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
            );
            if (textNodes.length > 0) {
                textNodes[0].textContent = ' ' + t.filters;
            }
        }

        // Блоки фільтрів
        const filterHeaders = document.querySelectorAll('.filter-header span');
        if (filterHeaders[0]) filterHeaders[0].textContent = t.price;
        if (filterHeaders[1]) filterHeaders[1].textContent = t.size;
        if (filterHeaders[2]) filterHeaders[2].textContent = t.generalAppearance;
        if (filterHeaders[3]) filterHeaders[3].textContent = t.colors;
        if (filterHeaders[4]) filterHeaders[4].textContent = t.stretchiness;
        if (filterHeaders[5]) filterHeaders[5].textContent = t.pattern;

        // Ціна - ВИПРАВЛЕНО (зберігаємо значення з DOM)
        const priceValues = document.querySelector('.price-values');
        if (priceValues) {
            const minSpan = document.getElementById('priceMin');
            const maxSpan = document.getElementById('priceMax');
            if (minSpan && maxSpan) {
                const minValue = minSpan.textContent;
                const maxValue = maxSpan.textContent;
                priceValues.innerHTML = `${t.from} <span id="priceMin">${minValue}</span> ${t.to} <span id="priceMax">${maxValue}</span>`;
            }
        }

        // Довжина
        const lengthLabel = document.querySelector('.filter-content strong');
        if (lengthLabel && (lengthLabel.textContent === 'Довжина' || lengthLabel.textContent === 'Length')) {
            lengthLabel.textContent = t.length;
        }

        // Загальний вид товару
        const appearanceLabels = document.querySelectorAll('.filter-block:nth-child(3) .filter-content label');
        const appearanceTexts = [
            t.salesStraight, t.looseStraight, t.relaxedFit,
            t.baggy, t.straight, t.loose
        ];
        appearanceLabels.forEach((label, i) => {
            if (appearanceTexts[i]) {
                const input = label.querySelector('input');
                const countSpan = label.querySelector('.count');
                if (input && countSpan) {
                    const countValue = countSpan.textContent;
                    const dataType = countSpan.getAttribute('data-type');
                    label.textContent = '';
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(appearanceTexts[i] + ' ('));
                    const newCount = document.createElement('span');
                    newCount.className = 'count';
                    newCount.setAttribute('data-type', dataType);
                    newCount.textContent = countValue;
                    label.appendChild(newCount);
                    label.appendChild(document.createTextNode(')'));
                }
            }
        });

        // Кольори
        const colorLabels = document.querySelectorAll('.color-grid label');
        const colorMap = {
            'Синій': t.blue, 'Blue': t.blue,
            'Кремовий': t.cream, 'Cream': t.cream,
            'Коричневий': t.brown, 'Brown': t.brown,
            'Оранжевий': t.orange, 'Orange': t.orange,
            'Червоний': t.red, 'Red': t.red,
            'Жовтий': t.yellow, 'Yellow': t.yellow,
            'Зелений': t.green, 'Green': t.green,
            'Сірий': t.gray, 'Gray': t.gray,
            'Фіолетовий': t.purple, 'Purple': t.purple,
            'Блакитний': t.lightBlue, 'Light Blue': t.lightBlue,
            'Білий': t.white, 'White': t.white,
            'Чорний': t.black, 'Black': t.black
        };

        colorLabels.forEach(label => {
            const input = label.querySelector('input');
            const countSpan = label.querySelector('.color-count');
            if (input && countSpan) {
                const value = input.value;
                const translatedColor = colorMap[value] || value;
                const countValue = countSpan.textContent;
                const dataColor = countSpan.getAttribute('data-color');
                label.textContent = '';
                label.appendChild(input);
                label.appendChild(document.createTextNode(translatedColor + ' ('));
                const newCount = document.createElement('span');
                newCount.className = 'color-count';
                newCount.setAttribute('data-color', dataColor);
                newCount.textContent = countValue;
                label.appendChild(newCount);
                label.appendChild(document.createTextNode(')'));
            }
        });

        // Розтяжність
        const stretchLabels = document.querySelectorAll('.filter-block:nth-child(6) .filter-content label');
        const stretchTexts = [t.high, t.medium, t.low];
        stretchLabels.forEach((label, i) => {
            if (stretchTexts[i]) {
                const input = label.querySelector('input');
                const match = label.textContent.match(/\((\d+)\)/);
                const count = match ? match[1] : '0';
                if (input) {
                    label.textContent = '';
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(stretchTexts[i] + ' (' + count + ')'));
                }
            }
        });

        // Візерунок
        const patternLabels = document.querySelectorAll('.pattern-grid label');
        const patternMap = {
            'Відсутній': t.none, 'None': t.none,
            'Смугастий': t.striped, 'Striped': t.striped,
            'Клітинка': t.checkered, 'Checkered': t.checkered,
            'Квітковий': t.floral, 'Floral': t.floral,
            'Інший': t.other, 'Other': t.other
        };

        patternLabels.forEach(label => {
            const input = label.querySelector('input');
            const countSpan = label.querySelector('.pattern-count');
            if (input && countSpan) {
                const value = input.value;
                const translatedPattern = patternMap[value] || value;
                const countValue = countSpan.textContent;
                const dataPattern = countSpan.getAttribute('data-pattern');
                label.textContent = '';
                label.appendChild(input);
                label.appendChild(document.createTextNode(translatedPattern + ' ('));
                const newCount = document.createElement('span');
                newCount.className = 'pattern-count';
                newCount.setAttribute('data-pattern', dataPattern);
                newCount.textContent = countValue;
                label.appendChild(newCount);
                label.appendChild(document.createTextNode(')'));
            }
        });

        // Кнопка "Додати в кошик"
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(btn => {
            btn.textContent = t.addToCart;
        });

        // Відгуки
        const reviewsSpans = document.querySelectorAll('.reviews');
        reviewsSpans.forEach(span => {
            const count = span.textContent.match(/\d+/);
            if (count) {
                span.textContent = `(${count[0]})`;
            }
        });

        // "Немає товарів"
        const noProducts = document.querySelector('.no-products p');
        if (noProducts) noProducts.textContent = t.noProducts;
    }

    // Слухач для зміни мови
    window.addEventListener('languageChanged', function (e) {
        translateFiltersPage(e.detail.language);
    });

    // Перевірка збереженої мови
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'uk';
    if (savedLanguage !== 'uk') {
        translateFiltersPage(savedLanguage);
    }
});