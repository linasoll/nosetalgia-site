function openPopup() {
    const eventButtons = document.querySelectorAll(".button-event");
    const eventPopups = document.querySelectorAll(".popup-event");
    const cartButton = document.querySelector(".button-cart");
    const cartPopup = document.querySelector(".cart-popup");

    if (eventButtons && eventPopups) {
        eventButtons.forEach((button) => {
            button.addEventListener("click", () => {
                eventPopups.forEach((popup) => {
                    resetEventPopup(popup);
                    popup.classList.remove("hidden");
                })
            })
        });
    }

    if (cartButton && cartPopup) {
        cartButton.addEventListener("click", () => {
            cartPopup.classList.remove("hidden");
        });
    }
}

function closePopup() {
    const crosses = document.querySelectorAll(".close-popup");
    const overlays = document.querySelectorAll(".popup-overlay");
    crosses.forEach((cross) => {
        cross.addEventListener("click", () => {
            overlays.forEach((overlay) => {
                overlay.classList.add("hidden")
            })
        })
    })
}

function submitOrder() {
    const form = document.querySelector(".cart-popup .form");
    const popupTitle = document.querySelector(".cart-popup .popup-title");
    const formText = document.querySelector(".cart-popup .form-text");

    if (!form || !popupTitle || !formText) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        localStorage.removeItem("cart");

        popupTitle.textContent = "Спасибо за заказ!";
        formText.textContent = "Заказ успешно оформлен";

        form.classList.add("hidden");

        renderCart();
    });
}

function submitEventForm() {
    const eventPopups = document.querySelectorAll(".popup-event");

    eventPopups.forEach((popup) => {
        const form = popup.querySelector(".form");
        const popupTitle = popup.querySelector(".popup-title");
        const formText = popup.querySelector(".form-text");

        if (!form || !popupTitle || !formText) return;

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            popupTitle.textContent = "Вы записаны!";
            formText.textContent = "Подробную информацию пришлем на электронную почту";

            form.classList.add("hidden");
        });
    });
}

function resetEventPopup(popup) {
    const popupTitle = popup.querySelector(".popup-title");
    const formText = popup.querySelector(".form-text");
    const form = popup.querySelector(".form");

    if (!popupTitle || !formText || !form) return;

    popupTitle.innerHTML = "Запись на&nbsp;мероприятие";
    formText.textContent = "Заполните форму, чтобы записаться";

    form.classList.remove("hidden");
    form.reset();
}

function submitConsultationForm() {
    const orderForm = document.querySelector("#order .form");
    const consultationPopup = document.querySelector(".consultation-popup");

    if (!orderForm || !consultationPopup) return;

    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        consultationPopup.classList.remove("hidden");
        orderForm.reset();
    });
}

function burgerMenu() {
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".burger-menu-overlay");
    const links = document.querySelectorAll(".menu-item")

    burger.addEventListener("click", () => {
        menu.classList.remove("hidden");
    })

    links.forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.add("hidden");
        })
    })

    menu.addEventListener("click", (e) => {
        if (e.target === menu) {
            menu.classList.add("hidden");
        }
    });
}