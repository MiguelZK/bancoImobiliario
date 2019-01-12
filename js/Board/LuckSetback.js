class LuckSetback extends Space {
    constructor(id, name) {
        super(id, name);
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