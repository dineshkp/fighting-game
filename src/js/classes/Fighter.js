class Fighter extends Sprite {
  constructor({position, velocity, color = 'red', offset = {x: 0, y: 0}, imageSrc, scale = 1, framesMax = 1, framesCurrent = 0, framesElapsed = 0, framesHold = 5}) {
    super({
      position,
      offset,
      imageSrc,
      scale,
      framesMax,
      framesCurrent,
      framesElapsed,
      framesHold
    });

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.color = color;
    this.lastKey = undefined;
    this.attackBox = {
      position: {
        x: this.position.x, y: this.position.y
      }, offset, width: 100, height: 50
    };
    this.isAttacking = false;
    this.health = 100;
  }

  update() {
    super.update();

    this.draw();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if ((this.position.y + this.height + this.velocity.y) >= canvas.height - 96) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100)
  }
}