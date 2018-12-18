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
        alert(`Você caiu na casa de ${(renter.name)} pague ${rent}`);
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

class Start extends Space {
    constructor(id, name) {
        super(id, name);
    }

    handleSpace() {

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

class Profit extends Space{
    constructor(id, name) {
        super(id, name);
    }
    handleSpace(player) {
        alert('Receba 200 de Lucro');
        player.receive(200);
    }
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


    handleSpace(player) {
        player.arrested = true;
        this.moveToJail(player);
    }
}