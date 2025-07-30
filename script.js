function showMessage(message) {
    document.getElementById('messageText').innerText = message;
    document.getElementById('messageBox').style.display = 'block';
}

function closeMessage() {
    document.getElementById('messageBox').style.display = 'none';
}

// Sao băng động
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.2
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.x -= star.speed;
        if (star.x < 0) {
            star.x = canvas.width;
            star.y = Math.random() * canvas.height;
        }
    });
    requestAnimationFrame(drawStars);
}
drawStars();

// Đếm ngày yêu
function countLoveDays() {
    const startDate = new Date("2025-07-23"); // <--- Đổi ngày bắt đầu yêu nhau tại đây
    const now = new Date();
    const diffTime = now - startDate;
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById("loveDays").innerText = `Yêu nhau được ${days} ngày 💕`;
}
countLoveDays();