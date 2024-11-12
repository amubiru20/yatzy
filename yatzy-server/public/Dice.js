export class Dice {
    constructor() {
        this.diceValues = [0, 0, 0, 0, 0];
        this.holdDice = [false, false, false, false, false];
        this.rollsLeft = 3;
    }

    async rollDice() {
        if (this.rollsLeft > 0) {
            try {
                // Fetch dice values from the server
                const response = await fetch('http://localhost:3000/roll-dices');
                if (!response.ok) throw new Error("Failed to fetch dice values");

                const serverDiceValues = await response.json();

                // Check if server returned correct number of values
                if (serverDiceValues.length !== this.diceValues.length) {
                    throw new Error("Invalid dice values received from server");
                }

                // Update dice values that are not held
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
            // Alert the player when no rolls are left
            alert("No rolls left. Please select a score category or reset your turn.");
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
