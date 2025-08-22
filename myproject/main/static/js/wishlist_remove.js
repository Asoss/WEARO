document.addEventListener("DOMContentLoaded", function () {
    console.log("wishlist_remove.js завантажився ✅");

    const buttons = document.querySelectorAll(".remove-from-wishlist");
    console.log("Знайдено кнопок:", buttons.length);

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            console.log("Натиснута кнопка видалення ✅");

            const productId = this.dataset.productId;
            console.log("ID продукту:", productId);

            const card = this.closest(".product-card");

            fetch(`/wishlist/toggle/${productId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                    "X-Requested-With": "XMLHttpRequest",
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Сервер повернув помилку: " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Отримано від сервера:", data);

                    if (data.removed) {
                        card.remove();
                        console.log("Продукт видалено зі сторінки ✅");
                    }
                })
                .catch(error => console.error("Помилка:", error));
        });
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});