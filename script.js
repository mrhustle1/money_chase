const man = document.getElementById('man');
const coin = document.getElementById('coin');
const scoreElement = document.getElementById('score');
let score = 0;
let manPosition = 50; // Initial position of the man (percentage)

function moveMan(e) {
    if (e.key === 'ArrowLeft' && manPosition > 0) {
        manPosition -= 5;
    } else if (e.key === 'ArrowRight' && manPosition < 100) {
        manPosition += 5;
    }
    man.style.left = `${manPosition}%`;
}

function dropCoin() {
    const coinStartPosition = Math.floor(Math.random() * 100);
    coin.style.left = `${coinStartPosition}%`;
    coin.style.top = '-30px';
    let dropInterval = setInterval(() => {
        let coinTop = parseInt(coin.style.top);
        coin.style.top = `${coinTop + 5}px`;

        // Check for collision with the man
        if (coinTop > 570 && Math.abs(coinStartPosition - manPosition) < 10) {
            score += 1;
            scoreElement.textContent = score;
            clearInterval(dropInterval);
            dropCoin();
        }

        // Reset coin if it reaches the bottom
        if (coinTop > 600) {
            clearInterval(dropInterval);
            dropCoin();
        }
    }, 50);
}

// Start the game
document.addEventListener('keydown', moveMan);
dropCoin();
