// YatzyGame.js
import { Dice } from './Dice.js';
import { YatzyEngine } from './YatzyEngine.js';

export class YatzyGame {
    constructor() {
        this.dice = new Dice();
        this.engine = new YatzyEngine();
    }

    initializeGame() {
        document.getElementById("roll-btn").addEventListener("click", () => this.rollDice());
        document.getElementById("end-turn-btn").addEventListener("click", () => this.resetTurn());

        document.querySelectorAll('[data-category]').forEach(cell => {
            cell.addEventListener("click", () => {
                const category = cell.getAttribute("data-category");
                this.selectScore(category, cell.id);
            });
        });

        this.rollDice();
    }

    rollDice() {
        this.dice.rollDice().then(() => this.displayDice());
    }

    toggleHold(index) {
        this.dice.toggleHold(index); // Toggle the hold state of the selected die
        this.displayDice();          // Update the display to reflect the hold state
    }

    displayDice() {
        const diceContainer = document.getElementById("dice-container");
        diceContainer.innerHTML = ""; // Clear previous dice display

        this.dice.diceValues.forEach((value, index) => {
            const die = document.createElement("div");
            die.classList.add("die");
            die.style.backgroundImage = `url('/images/dice-${value}.png')`;

            // Apply held styling if the die is held
            if (this.dice.holdDice[index]) {
                die.classList.add("held"); // Highlight held dice
            }

            // Add an event listener to toggle hold state without rerolling
            die.addEventListener("click", () => this.toggleHold(index));
            diceContainer.appendChild(die);
        });
    }

    resetTurn() {
        this.dice.resetDice();
        this.displayDice();
    }

    selectScore(category, cellId) {
        const cell = document.getElementById(cellId);
        if (cell.textContent === "") {
            const score = this.engine.calculateScore(category, this.dice.diceValues);
            cell.textContent = score;
            this.resetTurn(); // Reset the turn after a score is selected
        } else {
            alert("Score already set for this category.");
        }
    }
}

// Function to start the game when the "Start Game" button is clicked
window.onload = () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const startGameButton = document.getElementById("start-game-btn");

    startGameButton.addEventListener("click", () => {
        // Hide the welcome screen
        welcomeScreen.style.display = "none";

        // Initialize the game
        const game = new YatzyGame();
        game.initializeGame();
    });
};
