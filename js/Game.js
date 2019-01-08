class Game {
    constructor(players) {
        this.players = players
    }

    jailHandler(player, die){
        if (player.arrested == false) {
            this.movePlayer(player, die.result());
        } else {
            player.turnArrested += 1;
            $('.dice-result > .die__space').html(`${player.name} está na prisão`);
            if (player.turnArrested == 4) {
                this.movePlayer(player, die.result());
                player.arrested = false;
                player.turnArrested = 0;
            }else if(die.isEqual()){
                this.movePlayer(player, die.result());
                player.arrested = false;
            }
        }
    }

    checkPosition(player, diceresult) {
        const position = player.position;
        const space = board[position];
        movePawn(player, position);
        $('.dice-result > .die__space').html(`${player.name} caiu em ${space.name}`);
        setTimeout(() => {
            space.handleSpace(player, this.players, diceresult)
            console.log(player.properties)
        }, 100)
    }


    movePlayer(player, diceresult) {
        player.move(diceresult);
        this.checkPosition(player, diceresult);
    }

    
    turn(player) {
        const die = new Die();
        die.drawDice();
        this.jailHandler(player, die);
        if(!die.isEqual()){
            i++;
            if(die.equal == 3){
                player.arrested = true;
                this.jailHandler(player);
            }
        }
        
    }

    verifyEndGame(players) {
        if (players[0].balance < 1 || players[1].balance < 1) {
            return false
        }
        return true;
    }
}