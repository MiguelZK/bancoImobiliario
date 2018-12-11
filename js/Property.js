
class Player {
    constructor(name, color) {
        this.name = name,
            this.color = color,
            this.balance = 1808,
            this.properties = [],
            this.companies = []
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

}

class Die{
    throw(){
        return Math.floor(Math.random()*5)+1;
    }
}

class Game {
    constructor(players) {
        this.players = players;
        this.die1 = new Die();
        this.die2 = new Die();
    }
    move(){
        return this.die1.throw() + this.die2.throw();
    }

    buyProperty(player, property) {
        player.properties.push(property);
        player.pay(property.price);
    }

    buyCompany(player, company) {
        player.companies.push(company);
        player.pay(company.price);
    }

    buyHouse(player, property) {
        player.findProperty(property).totalHouse += 1;
        player.pay(property.housePrice);
    }

    payRent(payer, renter, property) {
        const th = property.totalHouse;
        const r = property.rent;
        const m = property.multiplier;
        if (property.totalHouse > 0) {
            const value = (r + (10 * m)) * th;
            renter.receive(value);
            payer.pay(value)
        } else {
            renter.receive(r);
            payer.pay(r);
        }
    }
}


const green = new Player('Mariana', 'green');
const white = new Player('Kyoshi', 'white');
const black = new Player('Isabella', 'black');
const yellow = new Player('Kevin', 'yellow');
const red = new Player('Analice', 'red');
const monopoly = new Game([green, white]);
monopoly.buyProperty(green, properties[0]);
monopoly.buyProperty(green, properties[1]);
monopoly.buyHouse(green, properties[0]);
monopoly.buyHouse(green, properties[0]);
console.log(green.balance);
console.log(white.balance);
monopoly.payRent(white, green, properties[0]);
console.log(green.balance);
console.log(white.balance);
console.log(monopoly.move());

