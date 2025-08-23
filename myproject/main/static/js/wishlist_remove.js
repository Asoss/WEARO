// document.addEventListener("DOMContentLoaded", function () {
//     console.log("wishlist_remove.js завантажився ✅");

//     const buttons = document.querySelectorAll(".remove-from-wishlist");
//     console.log("Знайдено кнопок видалення:", buttons.length);

//     buttons.forEach(function (btn) {
//         btn.addEventListener("click", function (e) {
//             e.preventDefault(); // запобігаємо стандартній дії
//             console.log("Натиснута кнопка видалення ✅");

//             const productId = this.getAttribute("data-product-id");
//             console.log("ID продукту:", productId);

//             if (!productId) {
//                 console.error("Product ID не знайдено!");
//                 return;
//             }

//             const card = this.closest(".product-card");
//             console.log("Знайдена карточка:", card);

//             if (!card) {
//                 console.error("Карточка товару не знайдена!");
//                 return;
//             }

//             fetch(`/wishlist/toggle/${productId}/`, {
//                 method: "POST",
//                 headers: {
//                     "X-CSRFToken": getCookie("csrftoken"),
//                     "X-Requested-With": "XMLHttpRequest",
//                 },
//             })
//                 .then(response => {
//                     console.log("Статус відповіді:", response.status);
//                     if (!response.ok) {
//                         throw new Error("Сервер повернув помилку: " + response.status);
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log("Отримано від сервера:", data);

//                     if (data.status === "removed") {
//                         console.log("Видаляємо карточку з DOM");
//                         card.style.opacity = "0.5"; // спочатку зробимо напівпрозорою
//                         setTimeout(() => {
//                             card.remove();
//                             console.log("Карточка видалена ✅");

//                             // Оновлюємо лічильник
//                             const countEl = document.querySelector("#wishlist-count");
//                             if (countEl) {
//                                 const currentCountText = countEl.textContent;
//                                 const currentCount = parseInt(currentCountText.match(/\d+/)?.[0] || "0");
//                                 const newCount = Math.max(0, currentCount - 1);
//                                 countEl.textContent = `(${newCount})`;
//                                 console.log("Лічильник оновлено:", newCount);
//                             }
//                         }, 300);
//                     } else {
//                         console.log("Статус не 'removed', а:", data.status);
//                     }
//                 })
//                 .catch(error => {
//                     console.error("Помилка при видаленні:", error);
//                 });
//         });
//     });

//     function getCookie(name) {
//         let cookieValue = null;
//         if (document.cookie && document.cookie !== "") {
//             const cookies = document.cookie.split(";");
//             for (let i = 0; i < cookies.length; i++) {
//                 const cookie = cookies[i].trim();
//                 if (cookie.startsWith(name + "=")) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     }
// });