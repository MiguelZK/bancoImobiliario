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
}

class Game {
    constructor(players) {
        this.players = players
    }


    checkPosition(player, diceresult) {
        // const position = player.position;
        // movePawn(player, position);
        // board[position].handleSpace(player, this.players, diceresult)
        board.forEach((space) => {
            if (space.id == player.position) {
                movePawn(player, space.id);
                $('.dice-result > .die__space').html(`e caiu em ${space.name}`);
                setTimeout(() => {
                    space.handleSpace(player, this.players, diceresult)
                }, 100)
            }
        })

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
    diceResult(dice) {
        dice.result();
    }

    drawDice(dice) {
        const diceRoll = [dice.die1, dice.die2];
        this.diceImg(diceRoll).forEach((drawedDie, i) => {
            document.querySelector(`.dice${i + 1}`).innerHTML = `${drawedDie}`;
        })
    }


    go(player, diceresult) {
        player.move(diceresult);
        this.checkPosition(player, diceresult);
    }
    turn(player) {
        $('.dice-result > .die__space').html('');
        const dice = new Die();
        const diceresult = dice.result();
        $('.dice-result > .die__player').html(`${player.name} tirou`);
        this.drawDice(dice);
        console.log(player.arrested);
        if (player.arrested === false) {
            this.go(player, diceresult);
        } else {
            console.log('to aqui');
            player.turnArrested += 1;
            $('.dice-result > .die__space').html('voce está na prisão');
            if (player.turnArrested == 3) {
                player.arrested = false;
                player.turnArrested = 0;
                this.go(player, this.diceResult(dice));
            }else 
            if(dice.die1 === dice.die2){
                console.log('dado igual');
                this.go(player, diceresult);
                player.arrested = false;
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