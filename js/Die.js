class Die {
    constructor() {
        this.die1 = this.roll(); // Propriedade "die1" do objeto Die, que altera a cada jogada com método "roll()", abaixo;
        this.die2 = this.roll(); // Propriedade "die2" do objeto Die, que altera a cada jogada com método "roll()", abaixo;
        this.equal = 0; // Contagem de jogadas que saem os dados iguais;
    }
    roll() { // "Rola" os dados e retorna o valor do mesmo;
        alert
        return (Math.floor(Math.random() * 6) + 1);
    }

    result() { // Retorna a soma das propriedades dos dados naquele momento;
        return this.die1 + this.die2;
    }

    diceImg(dice) { // Define o código unicode para cada resultado do método "roll()", acima. Recebe um array com os 2 dados;
        let arr = [];
        dice.forEach((die) => { // Para cada "die" do aray recebido, verifica o valor para o switch case;
            switch (die) { // Cada case adiciona o código do valor do dado (die) no array "arr";
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
        return arr; // Retorna o array "arr" para outras funções / métodos (no caso, abaixo, drawDice);
    }

    isEqual(){
        this.equal+=1; // Adiciona +1 no contador de jogadas com dados iguais;
        return this.die1 == this.die2; // Retorna verdadeiro se os dados são iguais;
    }

    drawDice() { // Método que desenha os dados
        const diceRoll = [this.die1, this.die2]; // Cria a const "diceRoll", com as propriedades "die1" e "die2" do objeto "Die" em um array;
        this.diceImg(diceRoll).forEach((drawedDie, i) => { // Chama o método diceImg (acima), que retornou um array com o código Unicode da imagem do dado do valor tirado; usa forEach pra passar por cada um deles (2), chamando cada um de "drawedDie";
            document.querySelector(`.dice${i + 1}`).innerHTML = `${drawedDie}`; // Busca no HTML com "document.querySelector" item de classe "dice" + número do índice (i) +1, isto é, ".dice1" e ".dice2", e com innerHTML atribui o valor de "drawedDie";
        })
    }
}