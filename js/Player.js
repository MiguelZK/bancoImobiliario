class Player {
    constructor(name, color) {
        this.name = name,
            this.color = color,
            this.balance = 1808,
            this.properties = [],
            this.companies = []
            this.position = 0;
    }
    finishRound(){
        this.balance+=200;
        this.round+=1;
    }

    findProperty(property) {
        let p;
        this.properties.forEach(a => {
            if (a === property) {
                p = a;
            }
        });
        return p;
    }
    
    pay(value) {
        this.balance -= value;
        updateBalance(this);
    }
    receive(value) {
        this.balance += value;
        updateBalance(this);
    }

    move(diceResult){  
        this.position+=diceResult;
        if(this.position > 10){
            this.position -= 11;
            this.finishRound();
        }
    }

    rollDice(){
        const diceValue = (Math.floor(Math.random()*5)+1);
        document.querySelector('.dice-result').innerHTML = `${diceValue} ${this.name}`;
        return diceValue;
    }

    
}

