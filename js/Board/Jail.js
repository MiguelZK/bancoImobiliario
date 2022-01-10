class Jail extends Space {
    constructor(id, name) {
        super(id, name);
    }

    moveToJail(player) {
        alert(`Parece que ${player} vai ver o sol quadrado umas rodadas...`); // Adicionei mensagem.
        player.position = 10; // Altera a propriedade position do objeto player.
        movePawn(player, 10) // Função de mover o peão para a mesma posição no tabuleiro.
    }


    handleSpace(player) { // Sobreescreve o método que vem de space.js, da classe Space.
        player.arrested = true; // Muda a propriedade "arrested" do objeto Player para "true"
        this.moveToJail(player); // Executa a função moveToJail, acima.
    }
}