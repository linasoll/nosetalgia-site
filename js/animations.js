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
    const hero = document.querySelector("#hero, #hero-404");

    if (!hero) return;

    let canCreate = true;

    hero.addEventListener("mousemove", (e) => {
        if (!canCreate) return;

        const rect = hero.getBoundingClientRect();

        createStar(
            hero,
            e.clientX - rect.left,
            e.clientY - rect.top
        );

        canCreate = false;
        setTimeout(() => canCreate = true, 500);
    });
}