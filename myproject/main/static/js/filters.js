document.addEventListener('DOMContentLoaded', function () {
    // Отримуємо всі заголовки фільтрів
    const filterHeaders = document.querySelectorAll('.filter-header');

    filterHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const filterBlock = this.parentElement;
            const toggleBtn = this.querySelector('.toggle-btn');
            const filterContent = filterBlock.querySelector('.filter-content');

            // Перемикаємо видимість контенту
            if (filterContent.style.display === 'none') {
                filterContent.style.display = 'block';
                toggleBtn.textContent = '−';
            } else {
                filterContent.style.display = 'none';
                toggleBtn.textContent = '+';
            }
        });
    });

    // Ініціалізація повзунка ціни
    const priceSliderMin = document.getElementById('priceSliderMin');
    const priceSliderMax = document.getElementById('priceSliderMax');
    const priceMinLabel = document.getElementById('priceMin');
    const priceMaxLabel = document.getElementById('priceMax');
    const products = document.querySelectorAll('.product');

    function updatePriceDisplay() {
        let minValue = parseInt(priceSliderMin.value);
        let maxValue = parseInt(priceSliderMax.value);

        if (minValue > maxValue) {
            [minValue, maxValue] = [maxValue, minValue];
        }

        priceMinLabel.textContent = minValue;
        priceMaxLabel.textContent = maxValue === 10000 ? '∞' : maxValue;

        filterByPrice(minValue, maxValue === 10000 ? Infinity : maxValue);
    }

    function filterByPrice(minPrice, maxPrice) {
        products.forEach(product => {
            const priceText = product.querySelector('p').textContent;
            const price = parseInt(priceText.replace(/\D/g, ''));

            if (price >= minPrice && price <= maxPrice) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    if (priceSliderMin && priceSliderMax) {
        priceSliderMin.addEventListener('input', updatePriceDisplay);
        priceSliderMax.addEventListener('input', updatePriceDisplay);
        updatePriceDisplay(); 
    }

    // Логіка розмірів (кнопки)
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.classList.toggle('active');
            console.log('Розмір обрано:', this.textContent);
        });
    });


    // Початкова установка кнопок як + 
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        const filterContent = btn.closest('.filter-block').querySelector('.filter-content');
        filterContent.style.display = 'none';
        btn.textContent = '+';
    });
});