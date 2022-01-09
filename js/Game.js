class Game {
    constructor(players) {
        this.players = players
    }

    jailHandler(player, die){
        if (player.arrested == false) {
            this.movePlayer(player, die.result());
        } else {
            player.turnArrested += 1;
            $('.dice-result > .die__space').html(`${player.name} está na prisão`); // Chama o espaço ao lado da imagem dos dados e coloca mensagem ali.
            if(die.isEqual()){ // Coloquei para cima o teste de dados iguais. Assim, se não conseguir na 3ª jogada, sai com o valor dos dados e paga P$ 50.
                this.movePlayer(player, die.result());
                player.arrested = false;

            }else if (player.turnArrested == 3) {
                this.movePlayer(player, die.result()); // Já se move conforme o resultado dos dados.
                player.arrested = false; // Player deixa de estar marcado como preso.
                player.turnArrested = 0; // Zera o número de jogadas de dados para sair da prisão.
                player.pay(50); // Adicionei pagamento para 3 jogadas sem sucesso para sair da prisão.
                alert(`${this.name} pagou P$ 50 para sair da prisão.
                
                Siga sua vida - e olho no caminho, capitalista sacana!`)
                // Tentar colocar marcador de jogadas no quadradinho da prisão
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
        }, 100)
    }


    movePlayer(player, diceresult) {
        player.move(diceresult);
        this.checkPosition(player, diceresult);
    }

    
    play(player) {
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