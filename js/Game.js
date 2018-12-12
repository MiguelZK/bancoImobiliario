
    let board = [
        new Property(1, 'leblon', 100, 6, 50, 3, 0, 50, 'pink'),
        new Property(2, 'presidente vargas', 100, 6, 50, 3, 0, 50, 'pink'),
        new Property(5, 'nossa senhora de copacabana', 100, 6, 50, 3, 0, 50, 'pink')
    ];

    

class Game {
    constructor(players) {
        this.players = players
    }
    verifyEndGame(players){
        players.forEach(player => {
            if(player.balance > 0){
                return true;
            }else{
                return false;
            }
        });
    }



    checkPosition(position){
        board.forEach((space) => {
            if(space.id == position){
                space.handleSpace();
            }
        })
    }



    turn(player){
        player.move(5);
        this.checkPosition(player.position);
    }

    play(){
        if(this.verifyEndGame()){
            this.players.forEach(player => {
                this.turn(player);
            });
            
        }
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
