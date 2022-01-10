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
        if (player.hasMoney(this.price, this.name)) { // Verifica se player tem dinheiro (função "hasMoney", em player.js)
            if (type == 'property') { // Verifica se é "property" (imóveis, bairros, ruas) ou companhias
                player.properties.push(this) // Adiciona ao array de "properties" do objeto player
                updatePlayersList(player, type, this); // Atualiza a lista visível no tabuleiro, adicionando linha ao HTML com o item
            } else if (type == 'company') {
                player.companies.push(this); // Adiciona ao array de companhias do objeto player
                updatePlayersList(player, type, this); // Atualiza a lista visível no tabuleiro, adicionando linha ao HTML com o item
            }
            player.pay(this.price); // Jogador paga (função pay, em player.js)
            this.owner = player.name; // Propriedade "owner" do imóvel é alterada para ficar com o nome do player
        }
    }
}
