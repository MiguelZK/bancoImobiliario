class Die {
    constructor() {
        this.die1 = this.roll();
        this.die2 = this.roll();
        this.equal = 0;
    }
    roll() {
        return (Math.floor(Math.random() * 6) + 1);
    }

    result() {
        return this.die1 + this.die2;
    }

    diceImg(dice) {
        let arr = [];
        dice.forEach((die) => {
            switch (die) {
                case 1: arr.push('&#9856;');
                    break;
                case 2: arr.push('&#9857;');
                    break;
                case 3: arr.push('&#9858;');
                    break;
                case 4: arr.push('&#9859;');
                    break;
                case 5: arr.push('&#9860;');
                    break;
                case 6: arr.push('&#9861;');
            }
        })
        return arr;
    }

    isEqual(){
        this.equal+=1;
        return this.die1 == this.die2;
    }

    drawDice() {
        const diceRoll = [this.die1, this.die2];
        this.diceImg(diceRoll).forEach((drawedDie, i) => {
            document.querySelector(`.dice${i + 1}`).innerHTML = `${drawedDie}`;
        })
    }
}