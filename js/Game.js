
    let board = [];

class Game {
    constructor(players) {
        this.players = players;
        this.die1 = new Die();
        this.die2 = new Die();
    }
    checkPosition(position){
        board.forEach((space, i) => {
            if(space.id == position){
                switch(space.type){
                    case 'property': handleProperty();
                    case 'luck-setback' : handleLuckSetback();
                    case 'company' : handleCompany();
                    case 'jail': handleJail();
                    case 'visitJail': handleVisitJail();
                    case 'free-park': handleFreePark();
                    case 'start': handleStart();
                    case 'profit': handleProfit();
                    case 'tax': handleTax();
                    default: return 'caiu no default';
                }
            }
        })
    }

    turn(player){
        player.move(player.rollDice());
        this.checkPosition(player.position);
        player.turn = false;
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
