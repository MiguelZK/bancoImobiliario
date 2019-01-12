class Player {
    constructor(name, color) {
        this.name = name,
            this.color = color,
            this.balance = 10808,
            this.properties = [],
            this.companies = [],
            this.position = 0,
            this.arrested = false,
            this.turnArrested = 0
    }

    hasMoney(value, spaceName) {
        const total = this.balance - value;
        return total > 0 ? true : alert(`${this.name} você não tem saldo para comprar ${spaceName}`);
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
        const position = this.position + diceResult;
        if ((position >= 40)) {
            this.receive(200);
            this.position = position - 40;
        } else {
            this.position = position;
        }


    }


}