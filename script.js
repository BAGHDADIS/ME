const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 200; // Number of snow particles

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Snowflake {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height; // Start above the screen
        this.vy = 1 + Math.random() * 3; // Vertical speed
        this.vx = (Math.random() - 0.5) * 1; // Slight horizontal drift
        this.size = Math.random() * 2 + 1; // Size between 1 and 3
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.y += this.vy;
        this.x += this.vx;

        // Reset if it goes off screen
        if (this.y > height) {
            this.reset();
        }

        // Wrap around horizontally
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Snowflake());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
});

// Start Screen Interaction
const startScreen = document.getElementById('start-screen');
const audio = document.getElementById('bgMusic');

if (startScreen) {
    startScreen.addEventListener('click', () => {
        // 1. Play Audio
        audio.play().catch(e => console.log("Audio play failed", e));

        // 2. Add 'active' class to body to trigger CSS transitions (show snow and content)
        document.body.classList.add('active');

        // 3. Fade out start screen
        startScreen.style.opacity = '0';

        // 4. Remove start screen from DOM after fade
        setTimeout(() => {
            startScreen.style.display = 'none';
        }, 1000);
    });
}

init();
animate();
