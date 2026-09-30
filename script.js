// --- Constants ---
const container = document.getElementById('container');
const resizeBtn = document.getElementById('resize-btn');
const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;
const CONTAINER_SIZE = 960; // Fixed pixel size of the main container

// --- State ---
let currentSize = DEFAULT_SIZE;

// --- Initialization ---
createGrid(currentSize);

// --- Event Listeners ---
resizeBtn.addEventListener('click', () => {
    let input = prompt("Enter the number of squares per side (Max 100):");
    
    // Convert input to number
    let newSize = parseInt(input);

    // Validation
    if (isNaN(newSize) || newSize <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }
    
    if (newSize > MAX_SIZE) {
        alert(`To prevent performance issues, the maximum size is ${MAX_SIZE}.`);
        newSize = MAX_SIZE;
    }

    // Update state and rebuild grid
    currentSize = newSize;
    createGrid(currentSize);
});

// --- Functions ---

/**
 * Creates a grid of divs inside the container.
 * @param {number} size - The number of squares per side (e.g., 16 for 16x16).
 */
function createGrid(size) {
    // 1. Clear the existing grid
    container.innerHTML = '';

    // 2. Calculate the width/height of each square
    // We use CONTAINER_SIZE / size to ensure the total space remains 960px
    const squareSize = CONTAINER_SIZE / size;

    // 3. Create the squares
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');

        // Set the dimensions dynamically
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // --- EXTRA CREDIT LOGIC SETUP ---
        // We initialize the square with a random RGB color immediately,
        // but set opacity to 0. It will become visible on hover.
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        
        square.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        square.style.opacity = '0'; // Start invisible

        // Add the hover listener
        square.addEventListener('mouseenter', handleSquareHover);

        container.appendChild(square);
    }
}

/**
 * Handles the mouse enter event on a square.
 * Applies the Extra Credit logic:
 * 1. Random RGB is already set as the base color.
 * 2. Progressive darkening: Increase opacity by 0.1 each time.
 */
function handleSquareHover(e) {
    const square = e.target;
    
    // Get current opacity (returns a string like "0" or "0.5")
    let currentOpacity = parseFloat(square.style.opacity);

    // Progressive Darkening: Add 10% (0.1) opacity per interaction
    // The cap is 1 (fully opaque / fully colored)
    if (currentOpacity < 1) {
        currentOpacity += 0.1;
        square.style.opacity = currentOpacity;
    }
}
