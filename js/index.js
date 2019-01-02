var i = 0;
movePawn = (player, spaceId) => {
  const playerColor = $(`.p-${player.color}`);
  $(playerColor).remove();
  $(`#${spaceId} .container`).append(playerColor);
}

updateBalance = (player) => {
  const balancePlayer = $(`.${player.name}`);
  return $(balancePlayer).html(`${player.name} saldo: ${player.balance}`);
}

updatePlayersList = (player, type) => {
  const list = $(`.purchase.${player.color} > ul`);
  let arr = [];
  if (type == 'property') {
    arr = player.properties;
  } else {
    arr = player.companies;
  }
  const space = arr[arr.length - 1];
  const item = createPurchaseItem();
  item.addClass(space.color);
  item.html(space.name);
  $(list).append(item);
}

findProperty = (property) =>{
  return $(`li:contains(${property.name})`);
}

createHouse = (property) => {
  const liProperty = findProperty(property);
  const house = document.createElement('I');
  $(house).addClass('fas fa-home');
  $(liProperty).append(house);
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
createPurchaseItem = () => {
  const item = document.createElement('LI');
  return $(item).addClass('item__purchase');
}
createPlayersWallet = (players) => {
  const balances = [...document.getElementsByClassName('balance')];
  const purchase = [...document.getElementsByClassName('purchase')]
  balances.forEach((balance, i) => {
    $(purchase[i]).addClass(`${players[i].color}`)
    $(balance).addClass(`${players[i].name}`)
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
  const p1Name = $('#p1').val();
  const p2Name = $('#p2').val();
  const p1 = new Player(p1Name, 'green');
  const p2 = new Player(p2Name, 'blue');
  createPlayersWallet([p1, p2]);
  return new Game([p1, p2]);
}


startGame = () => {
  const game = createGame();
  const players = game.players;
  $('.play').show(600);
  $('.wrapper').show(600);
  createPawn();
  $('.start-game').hide(600);
  $('.start-game').remove();

  let turn = true;


  $('.dice-button').click(() => {
    if (game.verifyEndGame(players)) {
      if (i == (players.length)) {
        i = 0;
      }
      game.turn(players[i]);

    } else {
      alert('fim do jogo')
    }

  })
}

window.onload = function () {
  $('.play').hide();
  $('.wrapper').hide();
  $('.play-button').click(startGame);
}






// if (turn) {
      //   game.turn(players[0])
      // } else {
      //   game.turn(players[1])
      // }
      // turn = !turn;