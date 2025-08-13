function createHeart() {
    const svgNS = "http://www.w3.org/2000/svg";
    const heart = document.createElementNS(svgNS, "svg");
    heart.setAttribute("viewBox", "0 0 32 29.6");
    heart.setAttribute("class", "heart-svg");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fill = getRandomPink();

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute(
        "d",
        "M23.6,0c-3.4,0-6.4,2.2-7.6,5.3C14.8,2.2,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4 c0,9.1,16,21.2,16,21.2s16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
    );
    heart.appendChild(path);
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

function getRandomPink() {
    const pinks = ["#ff99cc", "#ffb6c1", "#ffc0cb", "#ff80ab", "#fdaecb"];
    return pinks[Math.floor(Math.random() * pinks.length)];
}

setInterval(createHeart, 100);