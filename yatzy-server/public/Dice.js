// Dice.js
export class Dice {
    constructor() {
        this.diceValues = [0, 0, 0, 0, 0];
        this.holdDice = [false, false, false, false, false];
        this.rollsLeft = 3;
    }

    async rollDice() {
        if (this.rollsLeft > 0) {
            try {
                const response = await fetch('http://localhost:3000/roll-dices');
                if (!response.ok) throw new Error("Failed to fetch dice values");

                const serverDiceValues = await response.json();
                for (let i = 0; i < this.diceValues.length; i++) {
                    if (!this.holdDice[i]) {
                        this.diceValues[i] = serverDiceValues[i];
                    }
                }
                this.rollsLeft--;
            } catch (error) {
                console.error("Error rolling dice:", error);
                alert("Failed to roll dice. Please try again.");
            }
        } else {
            alert("No rolls left. Select a score category or reset the turn.");
        }
    }

    toggleHold(index) {
        this.holdDice[index] = !this.holdDice[index];
    }

    resetDice() {
        this.rollsLeft = 3;
        this.diceValues = [0, 0, 0, 0, 0];
        this.holdDice = [false, false, false, false, false];
    }
}
