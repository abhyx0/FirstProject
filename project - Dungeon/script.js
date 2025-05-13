 // DOM Elements
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const dungeonMap = document.getElementById('dungeon-map');
const challengeBox = document.getElementById('challenge-box');
const challengeText = document.getElementById('challenge-text');
const submitButton = document.getElementById('submit-button');
const codeInput = document.getElementById('code-input');

// Example challenges (simple format)
const challenges = [
    { 
      description: "Write a function that returns the factorial of a number.", 
      keyword: "function factorial" 
    },
    { 
      description: "What will `console.log(typeof NaN)` output?", 
      keyword: "number" 
    },
    { 
      description: "Fix the bug: `if (a = 5) {}`", 
      keyword: "==" 
    }
];

// Initial player position (middle of 5x5 grid)
let playerPosition = { row: 2, col: 2 };

// Active challenge reference
let currentChallenge = null;

// --- Show dungeon map when Start is clicked ---
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    dungeonMap.classList.add('sci-fi-reveal');
    dungeonMap.style.display = 'grid';
    updatePlayerPosition();
});

// --- Set up tiles ---
const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        const row = parseInt(tile.dataset.row);
        const col = parseInt(tile.dataset.col);

        if (isAdjacent(row, col)) {
            playerPosition = { row, col };
            updatePlayerPosition();
            tile.classList.add('clicked-glow');
            setTimeout(() => tile.classList.remove('clicked-glow'), 500);
            showRandomChallenge();
        } else {
            alert('⚠ You can only move to adjacent tiles!');
        }
    });
});

// --- Update player's position visually ---
function updatePlayerPosition() {
    tiles.forEach(tile => tile.classList.remove('player'));
    const index = playerPosition.row * 5 + playerPosition.col;
    tiles[index].classList.add('player');
}

// --- Check if a tile is adjacent ---
function isAdjacent(row, col) {
    const dr = Math.abs(row - playerPosition.row);
    const dc = Math.abs(col - playerPosition.col);
    return (dr + dc === 1);
}

// --- Show a random challenge ---
function showRandomChallenge() {
    currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    challengeText.innerText = currentChallenge.description;
    challengeBox.classList.remove('hidden');
    challengeBox.classList.add('sci-fi-reveal');
    codeInput.value = '';
}

// --- Check the submitted answer ---
submitButton.addEventListener('click', () => {
    const userCode = codeInput.value.trim().toLowerCase();
    if (!currentChallenge) {
        alert('No challenge active.');
        return;
    }

    if (userCode.includes(currentChallenge.keyword)) {
        alert('✅ Correct! You passed the challenge.');
        challengeBox.classList.add('hidden');
        codeInput.value = '';
    } else {
        alert('❌ Incorrect. Try again, brave warrior.');
        // Optionally shake the challenge box
        challengeBox.classList.add('shake');
        setTimeout(() => challengeBox.classList.remove('shake'), 500);
    }
});
