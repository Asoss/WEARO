document.addEventListener('DOMContentLoaded', function () {
    // Обробка кнопок розгортання/згортання фільтрів
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const filterBlock = this.closest('.filter-block');
            const filterContent = filterBlock.querySelector('.filter-content');
            const isVisible = filterContent.style.display === 'block';

            if (isVisible) {
                filterContent.style.display = 'none';
                this.textContent = '+';
            } else {
                filterContent.style.display = 'block';
                this.textContent = '−';
            }
        });
    });

    // Обробка кнопок "Згорнути" всередині фільтрів
    const collapseButtons = document.querySelectorAll('.collapse-btn');

    collapseButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const filterContent = this.closest('.filter-content');
            const filterBlock = this.closest('.filter-block');
            const toggleBtn = filterBlock.querySelector('.toggle-btn');

            if (filterContent && toggleBtn) {
                filterContent.style.display = 'none';
                toggleBtn.textContent = '+';
            }
        });
    });

    // Обробка розмірів
    const sizeButtons = document.querySelectorAll('.size-btn');

    sizeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            this.classList.toggle('selected');

            // Додаємо/прибираємо активний стиль
            if (this.classList.contains('selected')) {
                this.style.backgroundColor = '#000';
                this.style.color = 'white';
            } else {
                this.style.backgroundColor = '#fff';
                this.style.color = '#000';
            }

            // Застосовуємо фільтри після зміни
            applyFilters();
        });
    });

    // Обробка чекбоксів у фільтрах
    const filterCheckboxes = document.querySelectorAll('.filter-content input[type="checkbox"]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            console.log('Filter changed:', this.parentElement.textContent.trim());
            // Застосовуємо фільтри після зміни
            applyFilters();
        });
    });

    // Обробка слайдерів ціни
    const priceSliderMin = document.getElementById('priceSliderMin');
    const priceSliderMax = document.getElementById('priceSliderMax');
    const priceMinSpan = document.getElementById('priceMin');
    const priceMaxSpan = document.getElementById('priceMax');

    if (priceSliderMin && priceSliderMax) {
        function updatePriceDisplay() {
            let minVal = parseInt(priceSliderMin.value);
            let maxVal = parseInt(priceSliderMax.value);

            // Щоб мін не перетягував макс
            if (minVal >= maxVal) {
                minVal = maxVal - 1;
                priceSliderMin.value = minVal;
            }

            // Щоб макс не йшов нижче мін
            if (maxVal <= minVal) {
                maxVal = minVal + 1;
                priceSliderMax.value = maxVal;
            }

            priceMinSpan.textContent = priceSliderMin.value;
            priceMaxSpan.textContent = priceSliderMax.value === '10000' ? '10000' : priceSliderMax.value;

            applyFilters();
        }

        priceSliderMin.addEventListener('input', updatePriceDisplay);
        priceSliderMax.addEventListener('input', updatePriceDisplay);

        // Ініціалізація
        updatePriceDisplay();
    }

    // Функція для застосування всіх фільтрів
    function applyFilters() {
        const selectedSizes = [];
        const selectedLengths = [];
        const selectedColors = [];
        const selectedMaterials = [];
        const selectedStretch = [];
        const selectedAvailability = [];

        // Збираємо вибрані розміри
        document.querySelectorAll('.size-btn.selected').forEach(btn => {
            const parentBlock = btn.closest('.filter-block');
            const blockTitle = parentBlock.querySelector('.filter-header span').textContent;

            if (blockTitle === 'Розмір') {
                // Перевіряємо чи це в секції розміру чи довжини
                const lengthSection = btn.closest('.size-grid').previousElementSibling;
                if (lengthSection && lengthSection.tagName === 'STRONG' && lengthSection.textContent.includes('Довжина')) {
                    selectedLengths.push(btn.textContent);
                } else {
                    selectedSizes.push(btn.textContent);
                }
            }
        });

        // Збираємо вибрані чекбокси
        document.querySelectorAll('.filter-content input[type="checkbox"]:checked').forEach(checkbox => {
            const parentBlock = checkbox.closest('.filter-block');
            const blockTitle = parentBlock.querySelector('.filter-header span').textContent;
            const value = checkbox.parentElement.textContent.trim();

            switch (blockTitle) {
                case 'Колір':
                    selectedColors.push(value);
                    break;
                case 'Матеріал':
                    selectedMaterials.push(value);
                    break;
                case 'Розтяжність':
                    selectedStretch.push(value);
                    break;
                case 'Сповіщення про наявність товару':
                    selectedAvailability.push(value);
                    break;
            }
        });

        // Отримуємо всі товари
        const products = document.querySelectorAll('.product-item');

        products.forEach(product => {
            let showProduct = true;

            // Фільтрація по ціні
            if (priceSliderMin && priceSliderMax) {
                const priceText = product.querySelector('.product-price').textContent;
                const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
                const minPrice = parseFloat(priceSliderMin.value);
                const maxPrice = parseFloat(priceSliderMax.value);

                if (price < minPrice || (maxPrice < 10000 && price > maxPrice)) {
                    showProduct = false;
                }
            }

            // Тут можна додати інші фільтри по розмірах, кольорах і т.д.

            // Показуємо/ховаємо товар
            if (showProduct) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });

        console.log('Applied filters:', {
            sizes: selectedSizes,
            lengths: selectedLengths,
            colors: selectedColors,
            materials: selectedMaterials,
            stretch: selectedStretch,
            availability: selectedAvailability,
            priceMin: priceSliderMin?.value,
            priceMax: priceSliderMax?.value
        });
    }

    // Експортуємо функцію для використання в інших частинах коду
    window.applyFilters = applyFilters;
});