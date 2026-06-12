function addMerchToCart() {
    const cartButtons = document.querySelectorAll(".cart-card");

    cartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = button.closest(".card-merch");
            if (!card) return;
            const cardClone = card.cloneNode(true);
            const cardHTML = cardClone.outerHTML;
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(cardHTML);
            localStorage.setItem("cart", JSON.stringify(cart));
        });
    });
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
    const deleteButtons = document.querySelectorAll(".delete-card");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const index = Number(button.getAttribute("data-index"));
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });
    });
}