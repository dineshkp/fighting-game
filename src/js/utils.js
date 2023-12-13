function rectangularCollision({rectangle1, rectangle2}) {
  return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height);
}

function determineWinner({player, enemy, timerInstance}) {
  clearTimeout(timerInstance);
  document.querySelector('#Result').style.display = 'flex';

  if (player.health === enemy.health) {
    document.querySelector('#Result').innerHTML = 'Tie!!';
  } else if (player.health > enemy.health) {
    document.querySelector('#Result').innerHTML = 'Player 1 Wins!!';
  } else {
    document.querySelector('#Result').innerHTML = 'Player 2 Wins!!';
  }
}

let timer = 59;
let timerInstance = undefined;

function decreaseTimer() {
  timerInstance = setTimeout(decreaseTimer, 1000);
  if (timer > 0) {
    timer--;
    document.querySelector('#Timer').innerHTML = String(timer);
  }

  if (timer === 0) determineWinner({player, enemy, timerInstance});
}