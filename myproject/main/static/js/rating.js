document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById('rating-display-styles')) {
        const style = document.createElement('style');
        style.id = 'rating-display-styles';
        style.textContent = `
            .product-rating {
                display: flex;
                align-items: center;
                gap: 5px;
                margin: 5px 0;
            }
            
            .stars-container {
                display: flex;
                gap: 2px;
            }
            
            .star {
                font-size: 16px;
                color: #ddd;
                transition: color 0.2s ease;
            }
            
            .star.active {
                color: #ffc107;
            }
            
            .star.half {
                background: linear-gradient(90deg, #ffc107 50%, #ddd 50%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .rating-info {
                font-size: 14px;
                color: #666;
                margin-left: 8px;
            }
            
            .rating-link {
                font-size: 12px;
                color: #007bff;
                text-decoration: none;
                margin-left: 10px;
                padding: 2px 8px;
                border: 1px solid #007bff;
                border-radius: 3px;
                transition: all 0.2s ease;
            }
            
            .rating-link:hover {
                background-color: #007bff;
                color: white;
                text-decoration: none;
            }
            
            @media (max-width: 768px) {
                .product-rating {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 3px;
                }
                
                .rating-info {
                    margin-left: 0;
                }
                
                .rating-link {
                    margin-left: 0;
                    font-size: 11px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function displayStars(container, rating, maxStars = 5) {
        const starsContainer = container.querySelector('.stars-container');
        if (!starsContainer) return;

        starsContainer.innerHTML = '';

        for (let i = 1; i <= maxStars; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.innerHTML = '★';

            if (i <= Math.floor(rating)) {
                // повна зірка
                star.classList.add('active');
            } else if (i - rating < 1 && i - rating > 0) {
                // напівзірка
                star.classList.add('half');
            }

            starsContainer.appendChild(star);
        }
    }

    function formatRatingText(count, average) {
        if (count === 0) {
            return 'Поки немає оцінок';
        } else if (count === 1) {
            return `1 оцінка – ${parseFloat(average).toFixed(1)}`;
        } else if (count < 5) {
            return `${count} оцінки – середня: ${parseFloat(average).toFixed(1)}`;
        } else {
            return `${count} оцінок – середня: ${parseFloat(average).toFixed(1)}`;
        }
    }

    document.querySelectorAll(".product-rating").forEach(ratingBlock => {
        const productId = ratingBlock.dataset.productId;
        const averageRating = parseFloat(ratingBlock.dataset.averageRating) || 0;
        const ratingCount = parseInt(ratingBlock.dataset.ratingCount) || 0;
        const rateUrl = ratingBlock.dataset.rateUrl || `/product/${productId}/rate/`;

        if (!productId) {
            console.warn('Відсутній product-id для блоку рейтингу');
            return;
        }

        if (!ratingBlock.querySelector('.stars-container')) {
            ratingBlock.innerHTML = `
                <div class="stars-container"></div>
                <span class="rating-info"></span>
                <a href="${rateUrl}" class="rating-link">Оцінити</a>
            `;
        }

        // відображаємо зірки
        displayStars(ratingBlock, averageRating);

        // оновлюємо інформацію про рейтинг
        const ratingInfo = ratingBlock.querySelector('.rating-info');
        if (ratingInfo) {
            ratingInfo.textContent = formatRatingText(ratingCount, averageRating);
        }

        ratingBlock.title = `Рейтинг: ${averageRating.toFixed(1)} з 5 зірок (${ratingCount} оцінок)`;
    });

    // функція для оновлення рейтингу 
    window.updateRatingDisplay = function (productId, newAverage, newCount) {
        const ratingBlock = document.querySelector(`[data-product-id="${productId}"]`);
        if (ratingBlock) {
            ratingBlock.dataset.averageRating = newAverage;
            ratingBlock.dataset.ratingCount = newCount;

            displayStars(ratingBlock, newAverage);

            const ratingInfo = ratingBlock.querySelector('.rating-info');
            if (ratingInfo) {
                ratingInfo.textContent = formatRatingText(newCount, newAverage);
            }

            ratingBlock.title = `Рейтинг: ${parseFloat(newAverage).toFixed(1)} з 5 зірок (${newCount} оцінок)`;
        }
    };

    // функція для ініціалізації нових рейтингових блоків 
    window.initializeRatingDisplay = function (container = document) {
        container.querySelectorAll(".product-rating:not([data-initialized])").forEach(ratingBlock => {
            ratingBlock.dataset.initialized = "true";

            const productId = ratingBlock.dataset.productId;
            const averageRating = parseFloat(ratingBlock.dataset.averageRating) || 0;
            const ratingCount = parseInt(ratingBlock.dataset.ratingCount) || 0;
            const rateUrl = ratingBlock.dataset.rateUrl || `/product/${productId}/rate/`;

            if (!productId) {
                console.warn('Відсутній product-id для блоку рейтингу');
                return;
            }

            if (!ratingBlock.querySelector('.stars-container')) {
                ratingBlock.innerHTML = `
                    <div class="stars-container"></div>
                    <span class="reviews"></span>
                `;
            }

            displayStars(ratingBlock, averageRating);

            const reviewsElement = ratingBlock.querySelector('.reviews');
            if (reviewsElement) {
                reviewsElement.textContent = formatRatingText(ratingCount, averageRating);
            }

            ratingBlock.title = `Рейтинг: ${parseFloat(averageRating).toFixed(1)} з 5 зірок (${ratingCount} оцінок)`;
        });
    };

    // додаємо можливість швидкого оновлення при отриманні нових даних з сервера
    window.addEventListener('ratingUpdated', function (event) {
        const { productId, averageRating, ratingCount } = event.detail;
        window.updateRatingDisplay(productId, averageRating, ratingCount);
    });

});