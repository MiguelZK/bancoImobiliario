
updateBalance = (player) => {
  return $(`.${player.name}`).html(`${player.name} saldo: ${player.balance}`);
}
createPlayersWallet = (pName) =>{
const pWallet= document.createElement('DIV');
$(pWallet).addClass(`wallet ${pName}`);
$('.center').append(pWallet);

}

createPawn = () => { 
  const pawn1 = document.createElement('DIV');
  $(pawn1).addClass('pawn p-green');
  const pawn2 = document.createElement('DIV');
  $(pawn2).addClass('pawn p-blue');
  $('.start').append(pawn1);
  $('.start').append(pawn2);
}

createGame = () => {
 const p1Name = $('#p1').val();
 const p2Name = $('#p2').val();
 const p1 = new Player(p1Name, 'green') ;
 const p2 = new Player(p2Name, 'blue');
 createPlayersWallet (p1Name);
 createPlayersWallet (p2Name);
 $(`.${p1Name}`).html(`${p1Name} saldo: ${p1.balance}`)
 $(`.${p2Name}`).html(`${p2Name} saldo: ${p2.balance}`)
 return new Game([p1,p2]);
}


startGame = () => {
  const game = createGame();
  const players = game.players;
  createPawn();
  let turn = true;
  $('.dice-button').click(() => {
   if(game.verifyEndGame(players)){
    if(turn){
      game.turn(players[0])
      }else{
        game.turn(players[1])
      }
      turn = !turn;
  }else{
    alert('fim do jogo')
  }
   }) 
   
 
}




window.onload = function(){
$('.play-button').click(startGame);
}


