var i = 0;
movePawn = (player, spaceId) => { // Método para mover peão no tabuleiro
  const playerColor = $(`.p-${player.color}`); // Cria constante que recebe objeto HTML com clase "p-" + cor do player (ex: "p-green");
  $(playerColor).remove(); // Remove este mesmo elemento de onde estiver no tabuleiro;
  $(`#${spaceId} .container`).append(playerColor); // Adiciona o elemento HTML do peão (div) onde tem "id" do argumento "spaceId" e classe "container".
}

updateBalance = (player) => {
  const balancePlayer = $(`.${player.name}`);
  return $(balancePlayer).html(`${player.name} saldo: ${player.balance}`);
}

updatePlayersList = (player, type, property) => {
  const list = $(`.purchase.${player.color} > ul`);

  let arr = [];
  if (type == 'property') {
    arr = player.properties;
  } else {
    arr = player.companies;
  }
  const space = arr[arr.length - 1];
  const item = createPurchaseItem(property.id);
  item.addClass(space.color);
  item.html(space.name);
  $(list).append(item);
}

findProperty = (property) =>{
    return $(`#i${property.id}`); // Retorna a id do objeto do imóvel, com a letra "i" na frente, para diferenciar as ids.
}

createHouse = (property) => {
  const liProperty = findProperty(property); // Função acima que busca propriedade/espaço
  const house = document.createElement('I'); // Cria um elemento HTML <i> (itálico ou alteração na voz...)
  $(house).addClass('fas fa-home'); // Dentro do elemento "itálico", adiciona a classe de referência à imagem de casinha.
  $(liProperty).append(house); // Adiciona o elemento que traz nova id do imóvel, com letra "i" na frente.
}

createHotel = (property) => {
  const liProperty = findProperty(property);
  const hotel = document.createElement('I');
  $(hotel).addClass('fas fa-building');
  $(liProperty).append(hotel);
}

deleteHouses = (property) => {
  const liProperty = findProperty(property);
  const houses = liProperty.children();
  houses.remove();
}

createPurchaseItem = (id) => {
  const item = document.createElement('LI');
  return $(item).addClass('item__purchase').attr('id', `i${id}`);
}

createPlayersWallet = (players) => {
  const balances = [...document.getElementsByClassName('balance')];
  const purchase = [...document.getElementsByClassName('purchase')]
  balances.forEach((balance, i) => {
    $(purchase[i]).addClass(`${players[i].color}`)
    $(balance).addClass(`${players[i].name}`)
    const corTexto = `${players[i].color}` // puxa o texto da propriedade "color" de "player[i]".
    $(balance).css("color", corTexto); // Atribui a cor ao texto para identificar o peão mais facilmente.
    $(balance).html(`${players[i].name} saldo: ${players[i].balance}`)
  });
}

createPawn = () => {
  const pawn1 = document.createElement('DIV');
  $(pawn1).addClass('pawn p-green');
  const pawn2 = document.createElement('DIV');
  $(pawn2).addClass('pawn p-blue');
  $('.start .container').append(pawn1);
  $('.start .container').append(pawn2);
}

play = (i, players, game) => {
  console.log(players)
  if (i == players.length) {
    i = 0;
  } else {
    game.turn(players[i]);
    play(i++)

  }
}

createGame = () => {
  const p1Name = $('#p1').val(); // Cria a constante p1Name, que guarda o valor do input com id p1 no HTML buscado pelo código JQuery;
  const p2Name = $('#p2').val(); // Cria a constante p2Name, que guarda o valor do input com id p2 no HTML buscado pelo código JQuery;
  const p1 = new Player(p1Name, 'green'); // Cria a const p1, que guarda o objeto "Player" verde, com o nome da const p1Name;
  const p2 = new Player(p2Name, 'blue'); // Cria a const p2, que guarda o objeto "Player" azul, com o nome da const p2Name;
  createPlayersWallet([p1, p2]); // Cria a carteira dos jogadores no centro do tabuleiro, recebendo como argumento as constantes que referenciam os objetos "Player", no seu parâmetro - o array "Players";
  return new Game([p1, p2]); // Cria um objeto "Game" com um array de 2 objetos "Player" (p1 e p2) criados acima, neste método.
}

turn = (game, players) =>{ // Método "turn", com parâmetros "game" e "players" - define o turno de quem é a jogada;
  i == (players.length) ? i = 0 : null; // Se "i" é igual a "players.length" (que tem sempre 2 no formato atual), "i" é zerado. se "i == 0" ou "i == 1" (que representa o índice do jogador em "players"), não acontece nada;
  game.play(players[i]); 
}

startGame = () => {
  const game = createGame(); // Cria a const "game", que recebe o retorno do método "createGame()";
  const players = game.players; // Cria a const "players", que recebe o array "players" do objeto "Game";
  $('.play').show(600);
  $('.wrapper').show(600);
  createPawn();
  $('.start-game').hide(600);
  $('.start-game').remove();

  //let turn = true;


  $('.dice-button').click(() => {
    if (game.verifyEndGame(players)) {
      turn(game, players);

    } else {
      alert('Fim do Jogo')
    }

  })
}

window.onload = function () {
  $('.play').hide();
  $('.wrapper').hide();
  $('.nomeEditavel').hide(); // inicia com campo para trocar nome da rua oculto;
  $('.play-button').click(startGame); // inicia o jogo;
  $('.custom-button').click(trocaNomes);
}

trocaNomes = () => {
  let botao = document.getElementById('custom-button').textContent;
  
  if (botao == `NOMES RUAS`){
    document.getElementById('custom-button').innerText = `CONFIRMAR`
    $('.play-button').hide(); // Esconde, pelo menos, por enquanto, para não começar o jogo com imóveis no meio da edição;
    $('.nomeOriginal').hide();
    $('.nomeEditavel').show();
  }
  
  else if (botao == `CONFIRMAR`){
    const novoNome1 = document.getElementsByClassName('nomeEditavel');
    const nomeVelho1 = document.getElementsByClassName('nomeOriginal');
    alert(`Esta é a primeira rua que muda de nome - e mudou agora para ${novoNome1[0].value}`);
    $('.play-button').show(); // Esconde, pelo menos, por enquanto, para não começar o jogo com imóveis no meio da edição;
    nomeVelho1[0].innerHTML = novoNome1[0].value;
    // board[21].name = novoNome1[0].value;
    // console.log(board[21].name);
    $('.nomeEditavel').hide();
    $('.nomeOriginal').show();
    
    document.getElementById('custom-button').innerText = `NOMES RUAS`
  }
/*
  mudaNomeBotao();
  // $(mudaNomeBotao()).attr(confirmar);
  
  // $('.custom-button').click(() => {
    $('.custom-button').click(() => {
    alert(`Vamos ver se rola trocar os nomes dos imóveis. Manda ver!`);
    mudaNomeBotao();
  });*/
}
  
/*  
mudaNomeBotao = () => {
    const botao = document.getElementById('custom-button').textContent;
    // alert(`O botão atualmente se chama ${botao}`)
    return botao;
  }
*/

// if (turn) {
      //   game.turn(players[0])
      // } else {
      //   game.turn(players[1])
      // }
      // turn = !turn;