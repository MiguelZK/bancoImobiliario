class Space {
    constructor(id, name) {
        this.id = id,
            this.name = name
    }



    payRent(payer, renter, rent) {
        renter.receive(rent);
        payer.pay(rent);
        console.log(`${payer.name} pagou ${rent} para ${renter.name}`);
    }

    buy(player, type) {
        if (type == 'property') {
            player.properties.push(this)
            updatePlayersProperty(player);
        } else if (type == 'company') {
            player.companies.push(this);
            console.log(player.companies);
            updatePlayersCompany(player);
        }
        player.pay(this.price);
        this.owner = player.name;
        
    }
}

class Property extends Space {
    constructor(id, name, price, rent, housePrice, houseHotel, multiplier, totalHouse, mortgage, color) {
        super(id, name);
        this.price = price;
        this.rent = rent;
        this.housePrice = housePrice;
        this.houseHotel = houseHotel,
        this.multiplier = multiplier;
        this.totalHouse = totalHouse;
        this.mortgage = mortgage;
        this.color = color;
        this.type = 'property';
        this.owner = '';
    }

    hasHouse() {
        return this.totalHouse > 0;
    }

    getFinalRent() {
        const th = this.totalHouse;
        const r = this.rent;
        const m = this.multiplier;
        return (r + (10 * m)) * th;
    }

    buyHouse(player){
        player.pay(this.housePrice);
        this.totalHouse+=1;
    }

    handleSpace(player, players) {
        if (this.owner == '') {
            setTimeout(() => {
                if (confirm(`Você quer comprar ${this.name}?`)) {
                    this.buy(player, 'property');
                }
            }, 100);
        } else if (this.owner == player.name) {
            if (confirm(`Você quer comprar uma casa em ${this.name}?`)) {
                this.buyHouse(player);
            }
        } else {
            let finalRent = this.rent;
            if (this.hasHouse()) {
                finalRent = this.getFinalRent();
                console.log(finalRent);
            }
            players.forEach(owner => {
                if (this.owner == owner.name) {
                    this.payRent(player, owner, finalRent);
                }
            });
        }
        
    }
}

class Company extends Space {
    constructor(id, name, price, rent) {
        super(id, name),
            this.price = price,
            this.rent = rent,
            this.owner = ''
    }

    handleSpace(player, players) {
        if (this.owner == '') {
            setTimeout(() => {
                if (confirm(`Você quer comprar ${this.name}?`)) {
                    this.buy(player, 'company');
                }
            }, 100);
        } else if (this.owner == player.name) {
            console.log('Essa é sua companhia');
        } else {
            players.forEach(owner => {
                if (this.owner == owner.name) {
                    const finalRent = this.rent * player.rollDice();
                    this.payRent(player, owner, finalRent);
                }
            });
        }
    }
}

class LuckSetback extends Space {
    constructor(id) {
        super(id);
        this.cards = luckSetback;
    }
    pickCard() {
        const randomCard = (Math.floor(Math.random() * this.cards.length) + 1);
        let pickedCard;
        this.cards.forEach(card => {
            if (card.id == randomCard) {
                pickedCard = card;
            }
        })
        return pickedCard;

    }
    handleSpace(player) {
        const card = this.pickCard();
        if (card.type == 'setback') {
            console.log(`${card.description} pague ${card.price}`)
            player.pay(card.price);
        } else {
            console.log(`${card.description} receba ${card.price}`);
            player.receive(card.price);
        }

    }
}


class Start extends Space {
    constructor(id, name) {
        super(id, name);
    }

    handleSpace(player) {
        player.receive(200);
    }
}

class VisitJail extends Space {
    constructor(id, name) {
        super(id, name);
    }
    handleSpace() { }

}

class FreeParking extends Space {
    constructor(id, name) {
        super(id, name);
    }
    handleSpace() { }
}