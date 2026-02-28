const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let logos = [];
let images = [];
let loadedImages = 0;

const logoSources = ["logo.jpeg", "pichón adulto con go.png", "p f c.png"];

// Cargar imágenes correctamente
logoSources.forEach(src => {
    let img = new Image();
    img.src = src;
    img.onload = () => {
        loadedImages++;
        if (loadedImages === logoSources.length) {
            initParticles();
            animate();
        }
    };
    images.push(img);
});

function initParticles() {
    const numberOfParticles = 15; // menos cantidad

    for (let i = 0; i < numberOfParticles; i++) {

        let validPosition = false;
        let x, y;

        while (!validPosition) {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;

            validPosition = true;

            // Verifica distancia mínima entre partículas
            for (let j = 0; j < logos.length; j++) {
                let dx = logos[j].x - x;
                let dy = logos[j].y - y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) { // distancia mínima
                    validPosition = false;
                    break;
                }
            }
        }

        logos.push({
            x: x,
            y: y,
            size: 35 + Math.random() * 15,
            speedY: 0.2 + Math.random() * 0.3, // más lento
            img: images[Math.floor(Math.random() * images.length)]
        });
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    logos.forEach(p => {
        ctx.globalAlpha = 0.4; // transparencia elegante
        ctx.drawImage(p.img, p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1;

        p.y += p.speedY;

        if (p.y > canvas.height) {
            p.y = -50;
            p.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});