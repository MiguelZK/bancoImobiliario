




createPawn = () => { 
  const pawn1 = document.createElement('DIV');
  $(pawn1).addClass('pawn green');
  const pawn2 = document.createElement('DIV');
  $(pawn2).addClass('pawn blue');
  $('.start').append(pawn1);
  $('.start').append(pawn2);
}

addPlayers = () => {
 const p1Name = $('#p1').val();
 const p2Name = $('#p2').val();
 const p1 = new Player(p1Name, 'green') ;
 const p2 = new Player(p2Name, 'blue');
 return [p1, p2];
}

startGame = () => {
  const game = new Game(addPlayers());
  createPawn();
  // adicionar "board" de cada jogador
  return game;
}

playGame = (game) => {

}

window.onload = function(){
$('.button').click(startGame);
playGame(startGame())
}



