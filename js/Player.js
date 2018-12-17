class Player {
    constructor(name, color) {
        this.name = name,
            this.color = color,
            this.balance = 1808,
            this.properties = [],
            this.companies = [],
            this.position = 0
        this.arrested = false;
        this.turnArrested = 0;
    }

    hasMoney(value) {
        const total = this.balance - value;
        return total > 0 ? true : alert(`Você não tem saldo para comprar ${this.name}`);
    }

    finishRound() {
        this.receive(200);
        this.round += 1;
    }

    pay(value) {
        this.balance -= value;
        updateBalance(this);
    }
    receive(value) {
        this.balance += value;
        updateBalance(this);
    }

    move(diceResult) {
        this.position += diceResult;
            if (this.position > 40) {
                this.finishRound();
                this.position -= 41;
            }
            // $('.dice-result > .die__space').html(`e caiu em ${board[this.position].name}`);
    }

    rollDice() {
        const diceValue = (Math.floor(Math.random() * 5) + 1);
        document.querySelector('.dice-result').innerHTML = `${diceValue} ${this.name}`;
        return diceValue;
    }


}