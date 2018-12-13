class Player {
    constructor(name, color) {
        this.name = name,
            this.color = color,
            this.balance = 1808,
            this.properties = [],
            this.companies = []
            this.position = 0;
            this.turn = false;
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
    }
    receive(value) {
        this.balance += value;
    }

    move(diceResult){
        this.position+=diceResult;
        if(this.position > 10){
            this.position -= 11;
        }
        
    }

    rollDice(){
        const diceValue = (Math.floor(Math.random()*5)+1);
        document.querySelector('.dice-result').innerHTML = `${diceValue} ${this.name}`;
        return diceValue;
        //+ (Math.floor(Math.random()*5)+1);
    }

    
}

