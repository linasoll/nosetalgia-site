function merchHover() {
    const cards = document.querySelectorAll(".card-merch");

    cards.forEach((card) => {
        const img = card.querySelector(".img-card-merch");

        if (!img) return;

        const originalSrc = img.getAttribute("src");
        const hoverSrc = originalSrc.replace(".jpg", "-2.jpg");

        card.addEventListener("mouseenter", () => {
            img.setAttribute("src", hoverSrc);
        });

        card.addEventListener("mouseleave", () => {
            img.setAttribute("src", originalSrc);
        });
    });
}

function createStar(container, x, y) {
    const star = document.createElement("img");
    const randomStar = Math.floor(Math.random() * 3);

    star.classList.add("star-anim");

    if (randomStar === 0) {
        star.classList.add("star-l");
    } else if (randomStar === 1) {
        star.classList.add("star-m");
    } else {
        star.classList.add("star-s");
    }

    star.src = "images/star-anim.svg"
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    container.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 3000);
}

function heroStars() {
    const hero = document.getElementById("hero");
    
    let canCreate = true;
    if (hero) {
        hero.addEventListener("mousemove", (e) => {
            if (!canCreate) return;
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createStar(hero, x, y);
            canCreate = false;
            setTimeout(()=> {
                canCreate=true;
            }, 500);
        });
    } 
}