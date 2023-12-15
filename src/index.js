const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './assets/images/background.png'
});

const shop = new Sprite({
  position: {
    x: 600,
    y: 96
  },
  imageSrc: './assets/images/shop.png',
  scale: 3,
  framesMax: 6
});

const player = new Fighter({
  position: {
    x: 0, y: 0
  }, velocity: {
    x: 0, y: 0
  },
  color: 'blue',
  imageSrc: './assets/images/samuraiMack/Idle.png',
  framesMax: 8,
  framesElapsed: 0,
  framesHold: 10,
  scale: 2.5,
  offset: {
    x: 190,
    y: 156
  }
}); // create player

const enemy = new Fighter({
  position: {
    x: 500, y: 0
  }, velocity: {
    x: 0, y: 0
  },
  imageSrc: './assets/images/kenji/Idle.png',
  framesMax: 4,
  framesElapsed: 0,
  framesHold: 10,
  scale: 2.5,
  offset: {
    x: -225,
    y: 170
  }
}); // create enemy

const keys = {
  a: {
    pressed: false
  }, d: {
    pressed: false
  }, ArrowRight: {
    pressed: false
  }, ArrowLeft: {
    pressed: false
  }
};

decreaseTimer();

// Animation loop
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // Player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  if (rectangularCollision({
    rectangle1: player, rectangle2: enemy
  }) && player.isAttacking) {
    player.isAttacking = false;
    enemy.health -= 5;
    document.querySelector('#EnemyHealth').style.width = enemy.health + "%";
    console.log('enemy takes dmg');
  }

  if (rectangularCollision({
    rectangle1: enemy, rectangle2: player
  }) && enemy.isAttacking) {
    enemy.isAttacking = false;
    player.health -= 5;
    document.querySelector('#PlayerHealth').style.width = player.health + "%";
    console.log('player takes dmg');
  }

  if (player.health === 0 || enemy.health === 0) {
    determineWinner({player, enemy, timerInstance})
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      player.velocity.y = -20;
      break;
    case ' ':
      player.attack();
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y = -20;
      break;
    case 'ArrowDown':
      enemy.attack();
      break;
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = false;
      player.lastKey = 'a';
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      enemy.lastKey = 'ArrowLeft';
      break;
  }
})