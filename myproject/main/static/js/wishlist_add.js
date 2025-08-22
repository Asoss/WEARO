document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".wishlist-heart").forEach(function (heart) {
        heart.addEventListener("click", function () {
            const productId = this.dataset.productId;
            const img = this;

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
                    if (data.added) {
                        img.src = "/static/icons/heart_filled.png";
                    } else if (data.removed) {
                        img.src = "/static/icons/heart.png";
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
