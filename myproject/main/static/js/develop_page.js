// Matrix rain effect
function createMatrixRain() {
    const matrixBg = document.getElementById('matrixBg');
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';

    function createChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.opacity = Math.random();
        matrixBg.appendChild(char);

        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 5000);
    }

    setInterval(createChar, 100);
}

// Achievement notification
function showAchievement() {
    const achievement = document.getElementById('achievement');
    const sound = document.getElementById('achievementSound');

    // пробуємо зіграти звук
    sound.muted = false;
    sound.play().catch(e => console.log('Audio play failed:', e));

    // показуємо ачивку
    achievement.classList.add('show');

    // ховаємо через 5 сек
    setTimeout(() => {
        achievement.classList.remove('show');
    }, 5200);
}

document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();

    // чекаємо першої дії користувача
    const trigger = () => {
        showAchievement();
        document.removeEventListener('click', trigger);
        document.removeEventListener('keydown', trigger);
    };

    document.addEventListener('click', trigger);
    document.addEventListener('keydown', trigger);
});

// Konami code easter egg
let konamiCode = [];
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konami.join(',')) {
        document.body.style.animation = 'rainbow 1s infinite';
        alert('🌈 RAINBOW MODE ACTIVATED! 🌈');
    }
});

// Random glitch effect
setInterval(() => {
    const cards = document.querySelectorAll('.developer-card');
    cards.forEach(card => {
        if (Math.random() < 0.1) {
            card.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';
            setTimeout(() => {
                card.style.filter = 'none';
            }, 200);
        }
    });
}, 3000);



// Start effects
document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();
});

// Double click confetti effect
document.addEventListener('dblclick', () => {
    // Create confetti
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '0';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = 'matrix-fall 3s linear forwards';
        document.body.appendChild(confetti);

        setTimeout(() => {
            document.body.removeChild(confetti);
        }, 3000);
    }
});