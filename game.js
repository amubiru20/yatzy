// Global variables
let diceValues = [0, 0, 0, 0, 0];
let holdDice = [false, false, false, false, false];
let rollsLeft = 3;

// Roll the dice
function rollDice() {
    if (rollsLeft > 0) {
        for (let i = 0; i < diceValues.length; i++) {
            if (!holdDice[i]) {
                diceValues[i] = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
            }
        }
        rollsLeft--;
        displayDice(); // Call displayDice() to show the rolled dice
    } else {
        alert("No rolls left. Select a score category or reset the turn.");
    }
}

// Display the dice with images
function displayDice() {
    const diceContainer = document.getElementById("dice-container");
    diceContainer.innerHTML = ""; // Clear previous dice display

    diceValues.forEach((value, index) => {
        const die = document.createElement("div");
        die.classList.add("die");
        if (holdDice[index]) die.classList.add("held"); // Highlight held dice

        // Set the background image based on the dice value
        die.style.backgroundImage = `url('images/dice-${value}.png')`;
        
        die.addEventListener("click", () => toggleHold(index)); // Toggle hold state when clicked
        diceContainer.appendChild(die);
    });
}

// Toggle holding a die
function toggleHold(index) {
    holdDice[index] = !holdDice[index];
    displayDice(); // Update the display to show held dice
}

// Calculate scores for each category
function calculateScore(category) {
    const counts = Array(6).fill(0);
    diceValues.forEach(value => counts[value - 1]++);
    let score = 0;

    switch (category) {
        case 'ones': score = counts[0] * 1; break;
        case 'twos': score = counts[1] * 2; break;
        case 'threes': score = counts[2] * 3; break;
        case 'fours': score = counts[3] * 4; break;
        case 'fives': score = counts[4] * 5; break;
        case 'sixes': score = counts[5] * 6; break;
        case 'three-of-a-kind': score = counts.some(count => count >= 3) ? diceValues.reduce((a, b) => a + b, 0) : 0; break;
        case 'four-of-a-kind': score = counts.some(count => count >= 4) ? diceValues.reduce((a, b) => a + b, 0) : 0; break;
        case 'full-house': score = (counts.includes(3) && counts.includes(2)) ? 25 : 0; break;
        case 'small-straight': score = checkSmallStraight() ? 30 : 0; break;
        case 'large-straight': score = checkLargeStraight() ? 40 : 0; break;
        case 'chance': score = diceValues.reduce((a, b) => a + b, 0); break;
        case 'yatzy': score = counts.includes(5) ? 50 : 0; break;
        default: score = 0;
    }

    return score;
}

// Helper function for small straight
function checkSmallStraight() {
    const uniqueValues = Array.from(new Set(diceValues)).sort();
    return [1, 2, 3, 4].every(val => uniqueValues.includes(val)) ||
           [2, 3, 4, 5].every(val => uniqueValues.includes(val)) ||
           [3, 4, 5, 6].every(val => uniqueValues.includes(val));
}

// Helper function for large straight
function checkLargeStraight() {
    const uniqueValues = Array.from(new Set(diceValues)).sort().toString();
    return uniqueValues === '1,2,3,4,5' || uniqueValues === '2,3,4,5,6';
}

// Allow players to select scores
function selectScore(category, cellId) {
    const cell = document.getElementById(cellId);
    if (cell.textContent === "") {
        const score = calculateScore(category);
        cell.textContent = score;
        resetTurn();
    } else {
        alert("Score already set for this category.");
    }
}

// Reset turn after selecting score
function resetTurn() {
    rollsLeft = 3;
    diceValues = [0, 0, 0, 0, 0];
    holdDice = [false, false, false, false, false];
    displayDice(); // Update the display to show reset dice
}

// Event listeners
document.getElementById("roll-btn").addEventListener("click", rollDice);
document.getElementById("end-turn-btn").addEventListener("click", resetTurn);

// Initialize game
rollDice();

