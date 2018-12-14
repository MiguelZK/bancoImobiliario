
updateBalance = (player) => {
  const balancePlayer = $(`.${player.name}`);
  return $(balancePlayer).html(`${player.name} saldo: ${player.balance}`);
}

updatePlayersProperty = (player) => {
  const list = $(`.purchase.${player.color} > ul`);
  const properties = player.properties;
  const item = createPurchaseItem();
  item.html(properties[properties.length -1].name);
  $(list).append(item);
}

updatePlayersCompany = (player) => {
  const list = $(`.purchase.${player.color} > ul`);
  const companies = player.companies;
  console.log(companies);
  const item = createPurchaseItem();
  item.html(companies[companies.length -1].name);
  $(list).append(item);
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
  createPawn();
  let turn = true;
  $('.dice-button').click(() => {
    if (game.verifyEndGame(players)) {
      if (turn) {
        game.turn(players[0])
      } else {
        game.turn(players[1])
      }
      turn = !turn;
    } else {
      alert('fim do jogo')
    }
  })


}

window.onload = function () {
  $('.play-button').click(startGame);
}



// createPlayersPurchases(p1.color);
//   createPlayersPurchases(p2.color);
//   $(`.${p1Name}`).html(`${p1Name} saldo: ${p1.balance}`)
//   $(`.${p2Name}`).html(`${p2Name} saldo: ${p2.balance}`)
//   createListProperties(p1.color);
//   createListProperties(p2.color);

// createItemsProperties = (player) => {
//   if(player.properties != 0){
//     player.properties.forEach(prop => {
//       const item = document.createElement('LI');
//       $(item).addClass('item__properties');
//       $(item).html(prop.name);
//       $(list).append(item);
//     });
//   }
// }
// createListProperties = (player) =>{
//   const list = document.createElement('UL');
//     $(list).addClass('items__properties');
//     setTimeout(() =>{
//       $(`.${player.name}`).append(list);
//       createItemsProperties(player);
//     }, 1000);

// }

// createPlayersWallet = (pName, pColor) =>{
//   const pWallet= document.createElement('DIV');
//   $(pWallet).addClass(`wallet ${pName}`);
//   $(`.${pColor}`).append(pWallet);

//   }

// createPlayersPurchases = (pName) => {
//   const purchases = document.createElement('DIV');
//   $(purchases).addClass(`purchase ${pName}`);
//   $(`.wrapper`).append(purchases);
//   createPlayersWallet(pName, pColor)
// }