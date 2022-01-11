class Company extends Space {
    constructor(id, name, price, rent) {
        super(id, name),
            this.price = price,
            this.rent = rent,
            this.owner = '',
            this.color = 'grey'
    }

    handleSpace(player, players, diceresult) {
        if (this.owner == '') {

            if (this.confirmAction('new')) {
                this.buy(player, 'company')
            }

        } else if (this.owner == player.name) {
            alert(`Fazendo uma inspeção, ${player.name}?
            
            ${this.name} já é sua.`);

        } else {

            players.forEach(owner => {
                if (this.owner == owner.name) {
                    const finalRent = this.rent * diceresult;
                    this.payRent(player, owner, finalRent);
                }
            });

        }
    }
}