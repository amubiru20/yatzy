// YatzyEngine.js
export class YatzyEngine {
    calculateScore(category, diceValues) {
        const counts = Array(6).fill(0);
        diceValues.forEach(value => counts[value - 1]++);

        switch (category) {
            case 'ones': return counts[0] * 1;
            case 'twos': return counts[1] * 2;
            case 'threes': return counts[2] * 3;
            case 'fours': return counts[3] * 4;
            case 'fives': return counts[4] * 5;
            case 'sixes': return counts[5] * 6;
            case 'three-of-a-kind': return counts.some(count => count >= 3) ? diceValues.reduce((a, b) => a + b, 0) : 0;
            case 'four-of-a-kind': return counts.some(count => count >= 4) ? diceValues.reduce((a, b) => a + b, 0) : 0;
            case 'full-house': return (counts.includes(3) && counts.includes(2)) ? 25 : 0;
            case 'small-straight': return this.checkSmallStraight(diceValues) ? 30 : 0;
            case 'large-straight': return this.checkLargeStraight(diceValues) ? 40 : 0;
            case 'chance': return diceValues.reduce((a, b) => a + b, 0);
            case 'yatzy': return counts.includes(5) ? 50 : 0;
            default: return 0;
        }
    }

    checkSmallStraight(diceValues) {
        const uniqueValues = Array.from(new Set(diceValues)).sort();
        return [1, 2, 3, 4].every(val => uniqueValues.includes(val)) ||
               [2, 3, 4, 5].every(val => uniqueValues.includes(val)) ||
               [3, 4, 5, 6].every(val => uniqueValues.includes(val));
    }

    checkLargeStraight(diceValues) {
        const uniqueValues = Array.from(new Set(diceValues)).sort().toString();
        return uniqueValues === '1,2,3,4,5' || uniqueValues === '2,3,4,5,6';
    }
}
