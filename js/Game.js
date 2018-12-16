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


    checkPosition(player,diceresult) {
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

    diceImg(dice){
        let arr = [];
        dice.forEach((die)=>{
            switch(die){
                case 1 : arr.push('&#9856;');
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

    handleDice(){
        const dice = new Die();
        const diceResult = dice.result();
        const diceRoll = [dice.die1, dice.die2];
        const drawedDice = this.diceImg(diceRoll);
        drawedDice.forEach((drawedDie, i)=>{
            document.querySelector(`.dice${i+1}`).innerHTML = `${drawedDie}`;
        })
        return diceResult;
    }

    turn(player) {
        $('.dice-result > .die__player').html(`${player.name} tirou`);
        const diceresult =this.handleDice();
        player.move(diceresult);
        this.checkPosition(player, diceresult);

    }

    verifyEndGame(players) {
        if (players[0].balance < 1 || players[1].balance < 1) {
            return false
        }
        return true;
    }
}