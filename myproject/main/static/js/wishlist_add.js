// document.addEventListener("DOMContentLoaded", function () {
//     console.log("wishlist_add.js завантажився ✅");

//     const hearts = document.querySelectorAll(".wishlist-heart");
//     console.log("Знайдено сердечок:", hearts.length);

//     hearts.forEach(function (heart) {
//         heart.addEventListener("click", function () {
//             const productId = this.getAttribute("data-product-id");
//             console.log("Клік на товар ID:", productId);

//             if (!productId) {
//                 console.error("Product ID не знайдено!");
//                 return;
//             }

//             const currentHeart = this; // зберігаємо посилання на сердечко

//             fetch(`/wishlist/toggle/${productId}/`, {
//                 method: "POST",
//                 headers: {
//                     "X-CSRFToken": getCookie("csrftoken"),
//                     "X-Requested-With": "XMLHttpRequest",
//                 }
//             })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error("HTTP error! status: " + response.status);
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log("Відповідь сервера:", data);

//                     if (data.status === "added") {
//                         console.log("Додано - міняємо на filled");
//                         currentHeart.src = "/static/icons/heart_filled.png";
//                         currentHeart.classList.add("active");
//                     } else if (data.status === "removed") {
//                         console.log("Видалено - міняємо на empty");
//                         currentHeart.src = "/static/icons/heart.png";
//                         currentHeart.classList.remove("active");
//                     }
//                 })
//                 .catch(error => {
//                     console.error("Помилка wishlist:", error);
//                 });
//         });
//     });
// });

// // Функція для отримання CSRF токена
// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//         const cookies = document.cookie.split(";");
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + "=")) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }