class Space {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    confirmAction(action) {
        let phrase = '';
        switch (action) {
            case 'house':
                phrase = `Você quer comprar uma casa em ${this.name}?`;
                break;
            case 'hotel':
                phrase = `Você quer comprar um hotel em ${this.name}?`
                break;
            case 'new':
                phrase = `Você quer comprar ${this.name}?`;
                break;
            default:
                console.log('deu ruim');
        }

        return confirm(phrase);
    }

    payRent(payer, renter, rent) {
        renter.receive(rent);
        payer.pay(rent);
        alert(`Você caiu na casa de ${renter.name} pague ${rent}`);
    }

    buy(player, type) {
        if (player.hasMoney(this.price)) {
            if (type == 'property') {
                player.properties.push(this)
                updatePlayersList(player, type);
            } else if (type == 'company') {
                player.companies.push(this);
                updatePlayersList(player, type);
            }
            player.pay(this.price);
            this.owner = player.name;
        }
    }
}

class Property extends Space {
    constructor(id, name, price, rent, housePrice, houseHotel, multiplier, totalHouse, mortgage, color) {
        super(id, name),
            this.price = price,
            this.rent = rent,
            this.housePrice = housePrice,
            this.houseHotel = houseHotel,
            this.multiplier = multiplier,
            this.totalHouse = totalHouse,
            this.mortgage = mortgage,
            this.color = color,
            this.type = 'property',
            this.owner = ''
    }

    getFinalRent() {
        const th = this.totalHouse;
        const r = this.rent;
        const m = this.multiplier;
        return (r + (10 * m)) * th;
    }

    hasHouse() {
        return this.totalHouse > 0;
    }

    canBuyHouse(player) {
        const colorLength = $(`.top-bar.${this.color}`).length;
        const playerTotalColor = player.properties.filter(property => property.color == this.color).length;
        return colorLength == playerTotalColor ? true : false;
    }

    buyHouse(player) {
        if (player.hasMoney(this.housePrice)) {
            player.pay(this.housePrice);
            createHouse(this)
            this.totalHouse += 1;
        }
    }



    handleSpace(player, players) {
        if (this.owner == '') {

            if (this.confirmAction('new')) {
                this.buy(player, 'property')
            }

        } else if (this.owner == player.name) {
            if (this.canBuyHouse(player)) {
                if (this.confirmAction('house')) {
                    this.buyHouse(player);
                }
            } else {
                alert('Voce precisa ter todas as propriedades com mesma cor para construir uma casa!')
            }

        } else {
            let finalRent = this.rent;
            if (this.hasHouse()) {
                finalRent = this.getFinalRent();
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

            if (this.confirmAction('new')) {
                this.buy(player, 'company')
            }

        } else if (this.owner == player.name) {

            alert('Essa é sua companhia');

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
            alert(`${card.description} pague ${card.price}`)
            player.pay(card.price);
        } else {
            alert(`${card.description} receba ${card.price}`);
            player.receive(card.price);
        }

    }
}


class Start extends Space {
    constructor(id, name) {
        super(id, name);
    }

    handleSpace(player) {

    }
}

class VisitJail extends Space {
    constructor(id, name) {
        super(id, name);
    }
    handleSpace() {}

}

class FreeParking extends Space {
    constructor(id, name) {
        super(id, name);
    }
    handleSpace() {}
}

class Tax extends Space {
    constructor(id, name) {
        super(id, name);
    }
    handleSpace(player) {
        alert('Pague 200 de Impostos');
        player.pay(200);
    }

}

class Jail extends Space {
    constructor(id, name) {
        super(id, name);
    }

    moveToJail(player) {
        player.position = 10;
        movePawn(player, 10)
    }

    getOutJail(player, dice){

    }

    handleSpace(player) {
        player.arrested = true;
        this.moveToJail(player);
    }
}