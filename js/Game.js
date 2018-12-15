class Die{
    constructor(){
      this.die1 = this.roll();
      this.die2 = this.roll();
    }
    roll(){
        return (Math.floor(Math.random() * 6) + 1);
    } 

    result(){
        return this.die1+this.die2;
    }
}

class Game {
    constructor(players) {
        this.players = players
    }


    checkPosition(player) {
        board.forEach((space) => {
            if (space.id == player.position) {

                movePawn(player, space.id);
                setTimeout(() => {
                    space.handleSpace(player, this.players)
                }, 100)
            }
        })

    }

    turn(player) {
        const dice = new Die();
        const diceResult = dice.result();
        const diceRoll = [dice.die1, dice.die2];
        document.querySelector('.dice-result').innerHTML = `${diceResult} ${player.name}`;
        //player.move(diceResult);
        this.checkPosition(player);

    }

    verifyEndGame(players) {
        if (players[0].balance < 1 || players[1].balance < 1) {
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