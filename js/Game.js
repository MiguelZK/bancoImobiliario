

class Game {
    constructor(players) {
        this.players = players
    }


    
    movePawn(player, spaceId){
        const playerColor = $(`.p-${player.color}`);
        $(playerColor).remove();
        $(`#${spaceId}`).append(playerColor);
    }


    checkPosition(player) {
        board.forEach((space) => {
            if (space.id == player.position) {
                this.movePawn(player, space.id);
                space.handleSpace(player, this.players);
               
            }
        })

    }

    turn(player) {
        player.move(player.rollDice());
        this.checkPosition(player);
        
    }

    buyCompany(player, company) {
        player.companies.push(company);
        player.pay(company.price);
    }

    buyHouse(player, property) {
        player.findProperty(property).totalHouse += 1;
        player.pay(property.housePrice);
    }

    verifyEndGame(players) {
        if(players[0].balance < 1 || players[1].balance <1){
            return false
        }
        return true;
    }

    // payRent(payer, renter, property) {
    //     const th = property.totalHouse;
    //     const r = property.rent;
    //     const m = property.multiplier;
    //     if (property.totalHouse > 0) {
    //         const value = (r + (10 * m)) * th;
    //         renter.receive(value);
    //         payer.pay(value)
    //     } else {
    //         renter.receive(r);
    //         payer.pay(r);
    //     }
    // }
}
