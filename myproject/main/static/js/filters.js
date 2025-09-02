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

            console.log('Згорнути клік працює!'); // для перевірки
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
        });
    });

    // Обробка чекбоксів у фільтрах
    const filterCheckboxes = document.querySelectorAll('.filter-content input[type="checkbox"]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            console.log('Filter changed:', this.parentElement.textContent.trim());
            // Тут можна додати логіку для застосування фільтрів
        });
    });

    // Обробка слайдерів ціни
    const priceSliderMin = document.getElementById('priceSliderMin');
    const priceSliderMax = document.getElementById('priceSliderMax');
    const priceMinSpan = document.getElementById('priceMin');
    const priceMaxSpan = document.getElementById('priceMax');

    if (priceSliderMin && priceSliderMax) {
        function updatePriceDisplay() {
            const minVal = parseInt(priceSliderMin.value);
            const maxVal = parseInt(priceSliderMax.value);

            // Перевіряємо, щоб мінімальне значення не було більше максимального
            if (minVal >= maxVal) {
                priceSliderMin.value = maxVal - 100;
            }

            priceMinSpan.textContent = priceSliderMin.value;
            priceMaxSpan.textContent = priceSliderMax.value === '10000' ? '∞' : priceSliderMax.value;
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
                const sizeSection = btn.closest('.size-grid').previousElementSibling;
                if (sizeSection && sizeSection.tagName === 'STRONG') {
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

        // Тут можна додати логіку для відправки фільтрів на сервер
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

    // Додаємо кнопку "Застосувати фільтри" (опціонально)
    const filtersContainer = document.querySelector('.filters-container');
    if (filtersContainer) {
        const applyButton = document.createElement('button');
        applyButton.textContent = 'Застосувати фільтри';
        applyButton.className = 'apply-filters-btn';

        applyButton.addEventListener('click', function (e) {
            e.preventDefault();
            applyFilters();
        });
        filtersContainer.appendChild(applyButton);
    }
});