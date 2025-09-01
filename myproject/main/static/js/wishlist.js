    document.addEventListener("DOMContentLoaded", function () {
        console.log("wishlist_add.js завантажився ✅");

    const hearts = document.querySelectorAll(".wishlist-heart");
    console.log("Знайдено сердечок:", hearts.length);

    hearts.forEach(function (heart) {
        heart.addEventListener("click", function () {
            const productId = this.getAttribute("data-product-id");
            console.log("Клік на товар ID:", productId);

            if (!productId) {
                console.error("Product ID не знайдено!");
                return;
            }

            const currentHeart = this;

            fetch(`/wishlist/toggle/${productId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP error! status: " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Відповідь сервера:", data);

                    if (data.status === "added") {
                        console.log("✅ Додано до вішліста");
                        currentHeart.src = currentHeart.dataset.filled;
                        currentHeart.classList.add("active");
                    } else if (data.status === "removed") {
                        console.log("❌ Видалено з вішліста");
                        currentHeart.src = currentHeart.dataset.empty;
                        currentHeart.classList.remove("active");
                    }
                })
                .catch(error => {
                    console.error("Помилка wishlist:", error);
                });
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
