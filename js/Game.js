class Die {
    constructor() {
        this.die1 = this.roll();
        this.die2 = this.roll();
    }
    roll() {
        return (Math.floor(Math.random() * 6) + 1);
    }

    result() {
        return this.die1 + this.die2;
    }

    diceImg(dice) {
        let arr = [];
        dice.forEach((die) => {
            switch (die) {
                case 1: arr.push('&#9856;');
                    break;
                case 2: arr.push('&#9857;');
                    break;
                case 3: arr.push('&#9858;');
                    break;
                case 4: arr.push('&#9859;');
                    break;
                case 5: arr.push('&#9860;');
                    break;
                case 6: arr.push('&#9861;');
            }
        })
        return arr;
    }

    
    drawDice() {
        const diceRoll = [this.die1, this.die2];
        this.diceImg(diceRoll).forEach((drawedDie, i) => {
            document.querySelector(`.dice${i + 1}`).innerHTML = `${drawedDie}`;
        })
    }
}

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
            }else if(die.die1 === die.die2){
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
            i++;
        }, 100)
    }


    movePlayer(player, diceresult) {
        player.move(diceresult);
        this.checkPosition(player, diceresult);
    }

    
    turn(player, callback) {
        const die = new Die();
        die.drawDice();
        // $('.dice-result > .die__player').html(`${player.name} tirou`);
        this.jailHandler(player, die);
        callback;
    }

    verifyEndGame(players) {
        if (players[0].balance < 1 || players[1].balance < 1) {
            return false
        }
        return true;
    }
}