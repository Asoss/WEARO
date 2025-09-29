document.addEventListener('DOMContentLoaded', function () {
    const selector = document.getElementById('languageSelector');
    if (!selector) return;

    const selected = selector.querySelector('.selected');
    const options = selector.querySelector('.options');
    const optionItems = selector.querySelectorAll('.options li');


    const translations = {
        uk: {
            // Header
            help: 'Допомога та поширені запитання',
            womenClothing: 'Жіночий одяг',
            menClothing: 'Чоловічий одяг',
            welcome: 'Вітаємо',
            login: 'Увійти',
            register: 'Реєстрація',
            wishlist: 'Вподобано',
            cart: 'Кошик',

            // Navigation main
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

            // Common menu items
            newCollection: 'Нова колекція',
            viewAll: 'Переглянути все',
            jackets: 'Куртки',
            footwear: 'Взуття',
            otherCollections: 'Інші колекції',
            clothingItem: 'Одяг',
            cosmeticsItem: 'Косметика',
            accessoriesItem: 'Аксесуари',

            // Sale menu
            summerSeries: 'Літня серія',
            streetCollection: 'Вулична колекція',
            beachCollection: 'Пляжна колекція',
            homeCollection: 'Домашня колекція',
            sportCollection: 'Спортивна колекція',
            gardenCollection: 'Садова колекція',
            tshirts: 'Футболки',
            jewelry: 'Прикраси',
            other: 'Інше',
            autumnSeries: 'Осіння серія',
            fullCollection: 'Вся колекція',
            sweatersAndSweatshirts: 'Светри та Світшоти',
            createYourStyle: 'Створи свій стиль',

            // Brands menu
            wearoCollaboration: 'Колаборація з WEARO',
            partnerCollections: 'Колекції партнерів',
            wearoBrands: 'Бренди WEARO',
            selfridgeMix: 'Мікс селфрід',
            constructivism: 'Конструктивність',
            wearoLbks: 'WEARO лбкс',
            vintageClassic: 'Вінтажна класика',
            winterSet: 'Зимовий сет',
            artCollage: 'ART Колаж',
            discoverAlso: 'Відкрийте для себе також',
            allBrands: 'Всі бренди',
            beStylish: 'Будь на стилі',

            // New menu
            popularArticles: 'Найпопулярніші статті',
            prepareForSeason: 'Як підготуватись до сезону',
            bestFootwear: 'Найкраще взуття',
            colorPalette: 'Колірна гама',
            otherArticles: 'Інші статті',
            autumnCollection: 'Осіння колекція',
            skincare: 'Догляд за шкірою',
            jewelryItem: 'Прикраси',
            styleChange: 'Зміна стилю',
            classicCollection: 'Класична колекція',
            newSeason: 'Новий сезон',
            newStyle: 'Новий стиль',

            // Trends menu
            popularCollections: 'Найпоширеніші колекції',
            rainSeason: 'Сезон дощу',
            lightStyle: 'Стиль світла',
            businessWear: 'Діловий одяг',
            eveningBeauty: 'Вечірня краса',
            calmDay: 'Спокійний день',
            flowerGarden: 'Квітковий сад',
            starryNight: 'Зоряна ніч',
            chooseStyle: 'Обери стиль',

            // Clothing menu
            topRated: 'Найвищий рейтинг',
            naturalMaterials: 'Природні матеріали',
            eveningSeries: 'Вечірня серія',
            shopAlso: 'Купуйте також',
            forMaternity: 'Для материнства',
            forTall: 'Високим',
            forSmall: 'Маленьким',
            forBusy: 'Зайнятим',
            forRelaxation: 'Для відпочинку',
            forLuxury: 'Для розкоші',
            forWalks: 'Прогулянок',
            relaxationSeries: 'Серія для відпочинку',

            // Sportswear menu
            byActivity: 'За видом діяльності',
            streetRunning: 'Вуличний біг',
            gym: 'Спортзал',
            pool: 'Басейн',
            fitness: 'Фітнес',
            yoga: 'Йога',
            forExtreme: 'Для екстриму',
            shorts: 'Шорти',
            partnerGoods: 'Товари партнерів',
            specialized: 'Спеціалізований',

            // Shoes menu
            newInSeason: 'Нове в сезоні',
            forTraining: 'Для тренування',
            sneakers: 'Кросівки',
            trainers: 'Кеди',
            sandals: 'Босоніжки',
            boots: 'Черевики',
            more: 'Більше',
            productsByBrand: 'Товари за торговою маркою',
            ownStyle: 'Власний стиль',

            // Accessories menu
            shopRecommended: 'Купуйте рекомендоване',
            glasses: 'Окуляри',
            bracelets: 'Браслети',
            watches: 'Годинники',
            belts: 'Ремені',
            hats: 'Шапочки',
            giftSets: 'Подарункові набори',
            jewelryStore: 'Магазин ювелірних виробів',
            seeAll: 'Подивитись все',
            necklaces: 'Намистники',
            rings: 'Кільця',
            earrings: 'Сережки',
            lacedSteel: 'Мережива сталь',
            bags: 'Сумки',
            summerAccessories: 'Літні аксесуари',

            // Cosmetics menu
            discoverSomethingNew: 'Відкрий для себе щось нове',
            faceAndBody: 'Обличчя + Тіло',
            categories: 'Категорії',
            skincare2: 'Доглядова',
            decorative: 'Декоративна',
            hygienic: 'Гігієнічна',
            cleansing: 'Очищаюча',
            moisturizing: 'Зволожуюча',
            nourishing: 'Живильна',
            antiAging: 'Антивікова',

            // Personal menu
            recommended: 'Рекомендоване',
            collection2025: 'Колекція 20-25',
            natureCollection: 'Колекція "Природа"',
            monochrome: 'Монохром',
            eveningDresses: 'Вечірні сукні',
            easyWalk: 'Легка прогулянка',
            mostPopular: 'Найпопулярніше',
            darkChocolateStyle: 'Стиль "Темний-шоколад"',
            exclusive: 'Ексклюзив',

            // Footer
            joinWearo: 'Приєднуйтесь до WEARO та будьте в курсі новин!',
            supportText: 'Якщо у вас виникли якісь труднощі зверніться в службу підтримки',
            askQuestion: 'Задати запитання',
            send: 'Надіслати',
            paymentSystems: 'Платіжні системи:',
            helpAndInfo: 'ДОПОМОГА ТА ІНФОРМАЦІЯ',
            help2: 'Допомога',
            trackOrder: 'Відстежити замовлення',
            deliveryAndReturns: 'Доставка і повернення',
            siteMap: 'Мапа сайту',
            aboutWearo: 'ПРО КОМПАНІЮ WEARO',
            aboutUs: 'Про нас',
            deliveryInWearo: 'Доставка в WEARO',
            corporateResponsibility: 'Корпоративна відповідальність',
            investorSite: 'Сайт для інвесторів',
            moreFromWearo: 'БІЛЬШЕ ВІД WEARO',
            mobileApps: 'Мобільні додатки',
            giftCertificates: 'Подарункові сертифікати',
            blackFriday: 'Чорна п\'ятниця',
            shopAlsoIn: 'КУПУЙТЕ ТАКОЖ У:',
            internationalSites: 'Наші міжнародні сайти:',
            copyright: '© WEARO 2025 року',
            privacy: 'Конфіденційність',
            cookies: 'Файли cookie',
            terms: 'Умови',
            accessibility: 'Спеціальні можливості'
        },
        en: {
            // Header
            help: 'Help and FAQ',
            womenClothing: "Women's Clothing",
            menClothing: "Men's Clothing",
            welcome: 'Welcome',
            login: 'Login',
            register: 'Register',
            wishlist: 'Wishlist',
            cart: 'Cart',

            // Navigation main
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

            // Common menu items
            newCollection: 'New Collection',
            viewAll: 'View All',
            jackets: 'Jackets',
            footwear: 'Footwear',
            otherCollections: 'Other Collections',
            clothingItem: 'Clothing',
            cosmeticsItem: 'Cosmetics',
            accessoriesItem: 'Accessories',

            // Sale menu
            summerSeries: 'Summer Series',
            streetCollection: 'Street Collection',
            beachCollection: 'Beach Collection',
            homeCollection: 'Home Collection',
            sportCollection: 'Sport Collection',
            gardenCollection: 'Garden Collection',
            tshirts: 'T-shirts',
            jewelry: 'Jewelry',
            other: 'Other',
            autumnSeries: 'Autumn Series',
            fullCollection: 'Full Collection',
            sweatersAndSweatshirts: 'Sweaters & Sweatshirts',
            createYourStyle: 'Create Your Style',

            // Brands menu
            wearoCollaboration: 'WEARO Collaboration',
            partnerCollections: 'Partner Collections',
            wearoBrands: 'WEARO Brands',
            selfridgeMix: 'Selfridge Mix',
            constructivism: 'Constructivism',
            wearoLbks: 'WEARO LBKS',
            vintageClassic: 'Vintage Classic',
            winterSet: 'Winter Set',
            artCollage: 'ART Collage',
            discoverAlso: 'Discover Also',
            allBrands: 'All Brands',
            beStylish: 'Be Stylish',

            // New menu
            popularArticles: 'Most Popular Articles',
            prepareForSeason: 'How to Prepare for the Season',
            bestFootwear: 'Best Footwear',
            colorPalette: 'Color Palette',
            otherArticles: 'Other Articles',
            autumnCollection: 'Autumn Collection',
            skincare: 'Skincare',
            jewelryItem: 'Jewelry',
            styleChange: 'Style Change',
            classicCollection: 'Classic Collection',
            newSeason: 'New Season',
            newStyle: 'New Style',

            // Trends menu
            popularCollections: 'Most Popular Collections',
            rainSeason: 'Rain Season',
            lightStyle: 'Light Style',
            businessWear: 'Business Wear',
            eveningBeauty: 'Evening Beauty',
            calmDay: 'Calm Day',
            flowerGarden: 'Flower Garden',
            starryNight: 'Starry Night',
            chooseStyle: 'Choose Style',

            // Clothing menu
            topRated: 'Top Rated',
            naturalMaterials: 'Natural Materials',
            eveningSeries: 'Evening Series',
            shopAlso: 'Shop Also',
            forMaternity: 'For Maternity',
            forTall: 'For Tall',
            forSmall: 'For Small',
            forBusy: 'For Busy',
            forRelaxation: 'For Relaxation',
            forLuxury: 'For Luxury',
            forWalks: 'For Walks',
            relaxationSeries: 'Relaxation Series',

            // Sportswear menu
            byActivity: 'By Activity',
            streetRunning: 'Street Running',
            gym: 'Gym',
            pool: 'Pool',
            fitness: 'Fitness',
            yoga: 'Yoga',
            forExtreme: 'For Extreme',
            shorts: 'Shorts',
            partnerGoods: 'Partner Goods',
            specialized: 'Specialized',

            // Shoes menu
            newInSeason: 'New in Season',
            forTraining: 'For Training',
            sneakers: 'Sneakers',
            trainers: 'Trainers',
            sandals: 'Sandals',
            boots: 'Boots',
            more: 'More',
            productsByBrand: 'Products by Brand',
            ownStyle: 'Own Style',

            // Accessories menu
            shopRecommended: 'Shop Recommended',
            glasses: 'Glasses',
            bracelets: 'Bracelets',
            watches: 'Watches',
            belts: 'Belts',
            hats: 'Hats',
            giftSets: 'Gift Sets',
            jewelryStore: 'Jewelry Store',
            seeAll: 'See All',
            necklaces: 'Necklaces',
            rings: 'Rings',
            earrings: 'Earrings',
            lacedSteel: 'Laced Steel',
            bags: 'Bags',
            summerAccessories: 'Summer Accessories',

            // Cosmetics menu
            discoverSomethingNew: 'Discover Something New',
            faceAndBody: 'Face + Body',
            categories: 'Categories',
            skincare2: 'Skincare',
            decorative: 'Decorative',
            hygienic: 'Hygienic',
            cleansing: 'Cleansing',
            moisturizing: 'Moisturizing',
            nourishing: 'Nourishing',
            antiAging: 'Anti-Aging',

            // Personal menu
            recommended: 'Recommended',
            collection2025: 'Collection 20-25',
            natureCollection: '"Nature" Collection',
            monochrome: 'Monochrome',
            eveningDresses: 'Evening Dresses',
            easyWalk: 'Easy Walk',
            mostPopular: 'Most Popular',
            darkChocolateStyle: '"Dark Chocolate" Style',
            exclusive: 'Exclusive',

            // Footer
            joinWearo: 'Join WEARO and stay updated!',
            supportText: 'If you have any difficulties, contact support',
            askQuestion: 'Ask a question',
            send: 'Send',
            paymentSystems: 'Payment systems:',
            helpAndInfo: 'HELP AND INFORMATION',
            help2: 'Help',
            trackOrder: 'Track Order',
            deliveryAndReturns: 'Delivery and Returns',
            siteMap: 'Site Map',
            aboutWearo: 'ABOUT WEARO',
            aboutUs: 'About Us',
            deliveryInWearo: 'Delivery at WEARO',
            corporateResponsibility: 'Corporate Responsibility',
            investorSite: 'Investor Site',
            moreFromWearo: 'MORE FROM WEARO',
            mobileApps: 'Mobile Apps',
            giftCertificates: 'Gift Certificates',
            blackFriday: 'Black Friday',
            shopAlsoIn: 'SHOP ALSO IN:',
            internationalSites: 'Our international sites:',
            copyright: '© WEARO 2025',
            privacy: 'Privacy',
            cookies: 'Cookies',
            terms: 'Terms',
            accessibility: 'Accessibility'
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
        const t = translations[lang];

        // Header
        const helpLink = document.querySelector('.top-left a');
        if (helpLink) helpLink.textContent = t.help;

        const genderLinks = document.querySelectorAll('.gender-link');
        if (genderLinks[0]) genderLinks[0].textContent = t.womenClothing;
        if (genderLinks[1]) genderLinks[1].textContent = t.menClothing;

        // Header right
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            const links = headerRight.querySelectorAll('a');
            const isAuth = headerRight.textContent.includes('Вітаємо') || headerRight.textContent.includes('Welcome');

            if (isAuth) {
                const username = links[0].textContent.replace(/Вітаємо,\s*|Welcome,\s*/i, '').trim();
                links[0].childNodes[0].textContent = t.welcome + ', ' + username;
                links[1].childNodes[0].textContent = t.wishlist + ' ';
                links[2].childNodes[0].textContent = t.cart + ' ';
            } else {
                links[0].textContent = t.login;
                links[1].textContent = t.register;
                links[2].childNodes[0].textContent = t.wishlist + ' ';
                links[3].childNodes[0].textContent = t.cart + ' ';
            }
        }

        // Main navigation
        const navItems = document.querySelectorAll('.nav-item > a');
        const navTexts = [t.sale, t.brands, t.new, t.trends, t.clothing, t.sportswear, t.shoes, t.accessories, t.cosmetics, t.personal];
        navItems.forEach((item, i) => { if (navTexts[i]) item.textContent = navTexts[i]; });

        // Sale mega menu
        const saleMenu = document.querySelector('.mega-sale');
        if (saleMenu) {
            const h4s = saleMenu.querySelectorAll('h4');
            const links = saleMenu.querySelectorAll('a:not(.mega-btn)');
            if (h4s[0]) h4s[0].textContent = t.newCollection;
            if (h4s[1]) h4s[1].textContent = t.otherCollections;
            if (h4s[2]) h4s[2].textContent = t.summerSeries;
            if (h4s[3]) h4s[3].textContent = t.autumnSeries;

            const saleLinks = [t.viewAll, t.jackets, t.footwear, t.footwear, t.clothingItem, t.cosmeticsItem, t.accessoriesItem,
            t.streetCollection, t.beachCollection, t.homeCollection, t.sportCollection, t.gardenCollection, t.tshirts, t.jewelry, t.other,
            t.fullCollection, t.streetCollection, t.homeCollection, t.sportCollection, t.gardenCollection, t.sweatersAndSweatshirts, t.jewelry, t.other];

            let idx = 0;
            links.forEach(link => { if (saleLinks[idx]) link.textContent = saleLinks[idx++]; });

            const saleBtn = saleMenu.querySelector('.mega-btn strong');
            if (saleBtn) saleBtn.textContent = t.createYourStyle;
        }

        // Brands mega menu
        const brandsMenu = document.querySelector('.mega-brands');
        if (brandsMenu) {
            const h4s = brandsMenu.querySelectorAll('h4');
            if (h4s[0]) h4s[0].textContent = t.wearoCollaboration;
            if (h4s[1]) h4s[1].textContent = t.partnerCollections;
            if (h4s[2]) h4s[2].textContent = t.wearoBrands;
            if (h4s[3]) h4s[3].textContent = t.discoverAlso;

            const brandsBtn = brandsMenu.querySelector('.mega-btn strong');
            if (brandsBtn) brandsBtn.textContent = t.beStylish;
        }

        // New mega menu
        const newMenu = document.querySelector('.mega-new');
        if (newMenu) {
            const h4s = newMenu.querySelectorAll('h4');
            if (h4s[0]) h4s[0].textContent = t.popularArticles;
            if (h4s[1]) h4s[1].textContent = t.otherArticles;

            const captions = newMenu.querySelectorAll('.caption');
            if (captions[0]) captions[0].textContent = t.classicCollection;
            if (captions[1]) captions[1].textContent = t.newSeason;
            if (captions[2]) captions[2].textContent = t.newStyle;
        }

        // Trends mega menu
        const trendsMenu = document.querySelector('.mega-trends');
        if (trendsMenu) {
            const h4 = trendsMenu.querySelector('h4');
            if (h4) h4.textContent = t.popularCollections;

            const captions = trendsMenu.querySelectorAll('.caption');
            if (captions[0]) captions[0].textContent = t.starryNight;
            if (captions[1]) captions[1].textContent = t.calmDay;
            if (captions[2]) captions[2].textContent = t.chooseStyle;
        }

        // Clothing mega menu
        const clothesMenu = document.querySelector('.mega-clothes');
        if (clothesMenu) {
            const h4s = clothesMenu.querySelectorAll('h4');
            if (h4s[0]) h4s[0].textContent = t.topRated;
            if (h4s[1]) h4s[1].textContent = t.naturalMaterials;
            if (h4s[2]) h4s[2].textContent = t.shopAlso;

            const btns = clothesMenu.querySelectorAll('.mega-btn strong');
            if (btns[0]) btns[0].textContent = t.eveningSeries;
            if (btns[1]) btns[1].textContent = t.relaxationSeries;
        }

        // Sport mega menu
        const sportMenu = document.querySelector('.mega-sport');
        if (sportMenu) {
            const h4s = sportMenu.querySelectorAll('h4');
            if (h4s[0]) h4s[0].textContent = t.newCollection;
            if (h4s[1]) h4s[1].textContent = t.otherCollections;
            if (h4s[2]) h4s[2].textContent = t.byActivity;

            const captions = sportMenu.querySelectorAll('.caption');
            if (captions[0]) captions[0].textContent = t.partnerGoods;
            if (captions[1]) captions[1].textContent = t.specialized;
        }

        // Shoes mega menu
        const shoesMenu = document.querySelector('.mega-shoes');
        if (shoesMenu) {
            const h4s = shoesMenu.querySelectorAll('h4');
            if (h4s[0]) h4s[0].textContent = t.newCollection;
            if (h4s[1]) h4s[1].textContent = t.productsByBrand;

            const captions = shoesMenu.querySelectorAll('.caption');
            if (captions[1]) captions[1].textContent = t.ownStyle;
        }

        // Accessories mega menu
        const accMenu = document.querySelector('.mega-accessories');
        if (accMenu) {
            const h4s = accMenu.querySelectorAll('h4');
            if (h4s[0]) h4s[0].textContent = t.shopRecommended;
            if (h4s[1]) h4s[1].textContent = t.jewelryStore;

            const captions = accMenu.querySelectorAll('.caption');
            if (captions[0]) captions[0].textContent = t.bags;
            if (captions[1]) captions[1].textContent = t.summerAccessories;
        }

        // Cosmetics mega menu
        const cosMenu = document.querySelector('.mega-cosmetics');
        if (cosMenu) {
            const h4s = cosMenu.querySelectorAll('h4');
            if (h4s[0]) h4s[0].textContent = t.categories;
            if (h4s[1]) h4s[1].textContent = t.productsByBrand;

            const captions = cosMenu.querySelectorAll('.caption');
            if (captions[0]) captions[0].textContent = t.discoverSomethingNew;
            if (captions[1]) captions[1].textContent = t.faceAndBody;
        }

        // Personal mega menu
        const persMenu = document.querySelector('.mega-personal');
        if (persMenu) {
            const h4s = persMenu.querySelectorAll('h4');
            if (h4s[0]) h4s[0].textContent = t.newCollection;
            if (h4s[1]) h4s[1].textContent = t.otherCollections;
            if (h4s[2]) h4s[2].textContent = t.recommended;

            const captions = persMenu.querySelectorAll('.caption');
            if (captions[0]) captions[0].textContent = t.exclusive;
            if (captions[1]) captions[1].textContent = t.discoverSomethingNew;
        }

        // Footer
        const newsletter = document.querySelector('.newsletter p');
        if (newsletter) newsletter.textContent = t.joinWearo;

        const supportText = document.querySelector('.support p');
        if (supportText) supportText.textContent = t.supportText;

        const input = document.querySelector('.form-inline input');
        if (input) input.placeholder = t.askQuestion;

        const sendBtn = document.querySelector('.form-inline button');
        if (sendBtn) sendBtn.textContent = t.send;

        const payments = document.querySelector('.payments p');
        if (payments) payments.textContent = t.paymentSystems;

        const footerCols = document.querySelectorAll('.footer-column');
        if (footerCols[0]) {
            footerCols[0].querySelector('h4').textContent = t.helpAndInfo;
            const l = footerCols[0].querySelectorAll('li a');
            if (l[0]) l[0].textContent = t.help2;
            if (l[1]) l[1].textContent = t.trackOrder;
            if (l[2]) l[2].textContent = t.deliveryAndReturns;
            if (l[3]) l[3].textContent = t.siteMap;
        }
        if (footerCols[1]) {
            footerCols[1].querySelector('h4').textContent = t.aboutWearo;
            const l = footerCols[1].querySelectorAll('li a');
            if (l[0]) l[0].textContent = t.aboutUs;
            if (l[1]) l[1].textContent = t.deliveryInWearo;
            if (l[2]) l[2].textContent = t.corporateResponsibility;
            if (l[3]) l[3].textContent = t.investorSite;
        }
        if (footerCols[2]) {
            footerCols[2].querySelector('h4').textContent = t.moreFromWearo;
            const l = footerCols[2].querySelectorAll('li a');
            if (l[0]) l[0].textContent = t.mobileApps;
            if (l[1]) l[1].textContent = t.giftCertificates;
            if (l[2]) l[2].textContent = t.blackFriday;
        }

        const shopAlsoH4 = document.querySelector('.footer-countries h4');
        if (shopAlsoH4) shopAlsoH4.textContent = t.shopAlsoIn;

        const intSites = document.querySelector('.international-sites');
        if (intSites) intSites.textContent = t.internationalSites;

        const copyright = document.querySelector('.footer-copy-left p');
        if (copyright) copyright.textContent = t.copyright;

        const footerLinks = document.querySelectorAll('.footer-links a');
        if (footerLinks[0]) footerLinks[0].textContent = t.privacy;
        if (footerLinks[1]) footerLinks[1].textContent = t.cookies;
        if (footerLinks[2]) footerLinks[2].textContent = t.terms;
        if (footerLinks[3]) footerLinks[3].textContent = t.accessibility;

        document.documentElement.lang = lang;
    }

    // Завантаження збереженої мови
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