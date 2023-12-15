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
  },
  sprites: {
    idle: {
      imageSrc: './assets/images/samuraiMack/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './assets/images/samuraiMack/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './assets/images/samuraiMack/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './assets/images/samuraiMack/Fall.png',
      framesMax: 2
    },
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
  },
  sprites: {
    idle: {
      imageSrc: './assets/images/kenji/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './assets/images/kenji/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './assets/images/kenji/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './assets/images/kenji/Fall.png',
      framesMax: 2
    },
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
    player.switchSprites('run')
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.switchSprites('run')
    player.velocity.x = 5;
  } else {
    player.switchSprites('idle')
  }

  // Player Jump animation
  if (player.velocity.y < 0) {
    player.switchSprites('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprites('fall')
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.switchSprites('run')
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.switchSprites('run')
    enemy.velocity.x = 5;
  } else {
    enemy.switchSprites('idle')
  }

  // Enemy jump animation
  if (enemy.velocity.y < 0) {
    enemy.switchSprites('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprites('fall')
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