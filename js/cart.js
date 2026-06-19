function addMerchToCart() {
    if (window.cartHandlerAdded) return;
    window.cartHandlerAdded = true;

    document.addEventListener("click", (e) => {
        const button = e.target.closest(".cart-card, .delete-card");
        if (!button) return;

        const card = button.closest(".card-merch");
        if (!card) return;

        if (card.closest("#cart-list")) return;

        e.stopPropagation();

        const productName = card.querySelector(".card-heading")?.textContent.trim();
        if (!productName) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const isAlreadyInCart = cart.some((cardHTML) => {
            const temp = document.createElement("div");
            temp.innerHTML = cardHTML;

            const savedName = temp.querySelector(".card-heading")?.textContent.trim();

            return savedName === productName;
        });

        if (isAlreadyInCart) {
            cart = cart.filter((cardHTML) => {
                const temp = document.createElement("div");
                temp.innerHTML = cardHTML;

                const savedName = temp.querySelector(".card-heading")?.textContent.trim();

                return savedName !== productName;
            });
        } else {
            const cardClone = card.cloneNode(true);

            const cloneButton = cardClone.querySelector(".cart-card, .delete-card");

            if (cloneButton) {
                cloneButton.classList.remove("delete-card");
                cloneButton.classList.add("cart-card");
                cloneButton.removeAttribute("data-index");
            }

            cart.push(cardClone.outerHTML);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateMerchCartIcons();

        if (document.getElementById("cart-list")) {
            renderCart();
        }
    });

    updateMerchCartIcons();
}

function renderCart() {
    const cartList = document.getElementById("cart-list");
    const emptyCart = document.querySelector(".empty-cart");
    const cartOrder = document.getElementById("cart-order");
    const priceCart = document.getElementById("price-cart");
    const amount = document.getElementById("amount");

    if (!cartList) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartList.innerHTML = "";

    if (cart.length === 0) {
        if (emptyCart) emptyCart.classList.remove("hidden");
        if (cartOrder) cartOrder.classList.add("hidden");
        if (priceCart) priceCart.textContent = "0 ₽";
        if (amount) amount.textContent = "0 ₽";

        return;
    }

    if (emptyCart) emptyCart.classList.add("hidden");
    if (cartOrder) cartOrder.classList.remove("hidden");

    cart.forEach((cardHTML, index) => {
        const temp = document.createElement("div");
        temp.innerHTML = cardHTML;

        const card = temp.querySelector(".card-merch");
        const cartIcon = temp.querySelector(".cart-card");

        if (cartIcon) {
            cartIcon.classList.remove("cart-card");
            cartIcon.classList.add("delete-card");
            cartIcon.setAttribute("data-index", index);
        }

        if (card) {
            cartList.insertAdjacentHTML("beforeend", card.outerHTML);
        }
    });

    const totalPrice = getCartTotalPrice(cart);
    const formattedPrice = `${totalPrice.toLocaleString("ru-RU")} ₽`;

    if (priceCart) priceCart.textContent = formattedPrice;
    if (amount) amount.textContent = formattedPrice;

    deleteCartItem();
}

function getCartTotalPrice(cart) {
    let totalPrice = 0;

    cart.forEach((cardHTML) => {
        const temp = document.createElement("div");
        temp.innerHTML = cardHTML;

        const priceElement = temp.querySelector(".price");

        if (priceElement) {
            const priceText = priceElement.textContent;
            const priceNumber = Number(priceText.replace(/\D/g, ""));

            totalPrice += priceNumber;
        }
    });
    return totalPrice;
}

function deleteCartItem() {
    const deleteButtons = document.querySelectorAll("#cart-list .delete-card");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();

            const index = Number(button.getAttribute("data-index"));

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart();
            updateMerchCartIcons();
        });
    });
}

function updateMerchCartIcons() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const merchCards = document.querySelectorAll(".card-merch");

    merchCards.forEach((card) => {
        if (card.closest("#cart-list")) return;

        const button = card.querySelector(".cart-card, .delete-card");
        if (!button) return;

        const productName = card.querySelector(".card-heading")?.textContent.trim();
        if (!productName) return;

        const isInCart = cart.some((cardHTML) => {
            const temp = document.createElement("div");
            temp.innerHTML = cardHTML;

            const savedName = temp.querySelector(".card-heading")?.textContent.trim();

            return savedName === productName;
        });

        if (isInCart) {
            button.classList.remove("cart-card");
            button.classList.add("delete-card");
        } else {
            button.classList.remove("delete-card");
            button.classList.add("cart-card");
        }
    });
}