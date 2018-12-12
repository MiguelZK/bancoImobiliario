
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
