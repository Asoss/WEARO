document.addEventListener('DOMContentLoaded', function () {
    const selector = document.getElementById('languageSelector');
    if (!selector) return;

    const selected = selector.querySelector('.selected');
    const options = selector.querySelector('.options');
    const optionItems = selector.querySelectorAll('.options li');


    const translations = {
        uk: {
            help: 'Допомога та поширені запитання',
            womenClothing: 'Жіночий одяг',
            menClothing: 'Чоловічий одяг',
            welcome: 'Вітаємо',
            login: 'Увійти',
            register: 'Реєстрація',
            wishlist: 'Вподобано',
            cart: 'Кошик',
            sale: 'Розпродаж',
            brands: 'Бренди',
            new: 'Новинки',
            trends: 'Тренди',
            clothing: 'Одяг',
            sportswear: 'Спортивний одяг',
            shoes: 'Взуття',
            accessories: 'Аксесуари',
            cosmetics: 'Косметика',
            personal: 'Персональне',
            footer: '2025 Магазин одягу "Wearo"'
        },
        en: {
            help: 'Help and FAQ',
            womenClothing: "Women's Clothing",
            menClothing: "Men's Clothing",
            welcome: 'Welcome',
            login: 'Login',
            register: 'Register',
            wishlist: 'Wishlist',
            cart: 'Cart',
            sale: 'Sale',
            brands: 'Brands',
            new: 'New',
            trends: 'Trends',
            clothing: 'Clothing',
            sportswear: 'Sportswear',
            shoes: 'Shoes',
            accessories: 'Accessories',
            cosmetics: 'Cosmetics',
            personal: 'Personal',
            footer: '2025 Wearo Clothing Store'
        }
    };

    selected.addEventListener('click', function (e) {
        e.stopPropagation();
        selector.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!selector.contains(e.target)) {
            selector.classList.remove('active');
        }
    });

    options.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    optionItems.forEach(function (option) {
        option.addEventListener('click', function (e) {
            e.stopPropagation();

            const value = this.getAttribute('data-value');
            const flag = this.getAttribute('data-flag');
            const text = this.querySelector('span').textContent;

            selected.querySelector('img').src = flag;
            selected.querySelector('span').textContent = text;

            selector.classList.remove('active');
            translatePage(value);
            localStorage.setItem('selectedLanguage', value);
        });
    });

    function translatePage(lang) {
        const texts = translations[lang];

        const helpLink = document.querySelector('.top-left a');
        if (helpLink) helpLink.textContent = texts.help;

        const genderLinks = document.querySelectorAll('.gender-link');
        if (genderLinks[0]) genderLinks[0].textContent = texts.womenClothing;
        if (genderLinks[1]) genderLinks[1].textContent = texts.menClothing;

        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            const links = headerRight.querySelectorAll('a');
            const welcomeSpan = headerRight.querySelector('span');

            if (welcomeSpan && welcomeSpan.textContent.includes('Вітаємо') || welcomeSpan && welcomeSpan.textContent.includes('Welcome')) {
                welcomeSpan.textContent = welcomeSpan.textContent.replace(/Вітаємо|Welcome/, texts.welcome);
                if (links[0]) links[0].textContent = texts.wishlist;
                if (links[1]) links[1].textContent = texts.cart;
            } else {
                if (links[0]) links[0].textContent = texts.login;
                if (links[1]) links[1].textContent = texts.register;
                if (links[2]) links[2].textContent = texts.wishlist;
                if (links[3]) links[3].textContent = texts.cart;
            }
        }

        const navItems = document.querySelectorAll('.nav-item');
        const navTexts = [
            texts.sale,
            texts.brands,
            texts.new,
            texts.trends,
            texts.clothing,
            texts.sportswear,
            texts.shoes,
            texts.accessories,
            texts.cosmetics,
            texts.personal
        ];

        navItems.forEach((item, index) => {
            if (navTexts[index]) {
                item.textContent = navTexts[index];
            }
        });

        const footer = document.querySelector('footer');
        if (footer) {
            footer.textContent = texts.footer;
        }
        document.documentElement.lang = lang;
    }

    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== 'uk') {
        const savedOption = Array.from(optionItems).find(option =>
            option.getAttribute('data-value') === savedLanguage
        );
        if (savedOption) {
            const value = savedOption.getAttribute('data-value');
            const flag = savedOption.getAttribute('data-flag');
            const text = savedOption.querySelector('span').textContent;

            selected.querySelector('img').src = flag;
            selected.querySelector('span').textContent = text;

            translatePage(value);
        }
    }
});