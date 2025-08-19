alert("JavaScript файл завантажився!");
console.log("JavaScript файл завантажився!");


document.addEventListener("DOMContentLoaded", function () {
    // Обробка кліків на сердечка
    document.querySelectorAll(".wishlist-heart").forEach(function (heart) {
        heart.addEventListener("click", function () {
            const productId = this.getAttribute("data-product-id");
            console.log("Кліснули на товар з ID:", productId);

            if (!productId) {
                console.error("Product ID не знайдено!");
                return;
            }

            fetch(`/wishlist/toggle/${productId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                    "X-Requested-With": "XMLHttpRequest",
                },
            })
                .then(response => {
                    console.log("Отримали відповідь:", response);
                    return response.json();
                })
                .then(data => {
                    console.log("Дані з сервера:", data);

                    if (data.status === "added") {
                        console.log("Товар додано в wishlist");
                        // Змінюємо на заповнене сердечко
                        this.src = this.src.replace("heart.png", "heart_filled.png");
                        this.classList.add("active");
                    } else if (data.status === "removed") {
                        console.log("Товар видалено з wishlist");
                        // Змінюємо на порожнє сердечко
                        this.src = this.src.replace("heart_filled.png", "heart.png");
                        this.classList.remove("active");
                    }
                })
                .catch(error => {
                    console.error("Помилка при виконанні запиту:", error);
                });
        });
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});