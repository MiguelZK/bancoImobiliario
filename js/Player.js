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
        this.receive(200);
        this.round+=1;
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
        if(this.position > 20){
            this.finishRound();
            this.position -= 21;
        }
    }

    rollDice(){
        const diceValue = (Math.floor(Math.random()*5)+1);
        document.querySelector('.dice-result').innerHTML = `${diceValue} ${this.name}`;
        return diceValue;
    }

    
}

