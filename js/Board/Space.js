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
        alert(`Você caiu na casa de ${(renter.name)} pague ${rent}`); // Mensagem colocada acima, para valores alterarem depois da mensagem.
        renter.receive(rent); // Locatário recebe (função de player.js)
        payer.pay(rent); // Locador paga (função de player.js)
    }

    buy(player, type) {
        if (player.hasMoney(this.price, this.name)) {
            if (type == 'property') {
                player.properties.push(this)
                updatePlayersList(player, type, this);
            } else if (type == 'company') {
                player.companies.push(this);
                updatePlayersList(player, type, this);
            }
            player.pay(this.price);
            this.owner = player.name;
        }
    }
}
