import { YatzyEngine } from './YatzyEngine.js';

export class YatzyGame {
    constructor() {
        this.diceValues = [0, 0, 0, 0, 0];
        this.holdDice = [false, false, false, false, false];
        this.yatzyEngine = new YatzyEngine();
        this.initializeGame();
    }

    initializeGame() {
        $('#start-game-btn').on('click', () => {
            $('#welcome-screen').hide();
            for (let i = 0; i < 5; i++) {
                const die = $('<div>').addClass('die').attr('data-index', i);
                $('#dice-container').append(die);
            }
        });

        $('#animate-roll-btn').on('click', () => {
            this.rollDiceAnimation();
        });

        $(document).on('click', '#dice-container .die', (event) => {
            const index = $(event.currentTarget).data('index');
            this.toggleHold(index);
        });

        $(document).on('click', '#scorecard td[data-category]', (event) => {
            const category = $(event.currentTarget).data('category');
            const score = this.yatzyEngine.calculateScore(category, this.diceValues);
            $(event.currentTarget).text(score);
        });
    }

    toggleHold(index) {
        this.holdDice[index] = !this.holdDice[index];
        console.log(`Die ${index} hold state:`, this.holdDice[index]); // Debugging log
        const die = $('#dice-container .die').eq(index);
        die.toggleClass('held', this.holdDice[index]);
    }

    rollDiceAnimation() {
        const diceUnicode = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        $('#dice-container .die').each((index, element) => {
            if (!this.holdDice[index]) {
                const die = $(element);
                die.addClass('rolling');
                let rollCount = 0;
                const rollInterval = setInterval(() => {
                    const randomFace = Math.floor(Math.random() * 6) + 1;
                    this.diceValues[index] = randomFace;
                    die.text(diceUnicode[randomFace - 1]);
                    rollCount++;

                    if (rollCount > 10) {
                        clearInterval(rollInterval);
                        die.removeClass('rolling');
                    }
                }, 100);
            }
        });
    }
}

$(document).ready(() => {
    new YatzyGame();
});
