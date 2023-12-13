class Sprite {
  constructor({position, imageSrc, scale = 1, framesMax = 1}) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
  }

  draw() {
    c.drawImage(
        this.image,
        0,
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x,
        this.position.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
    );
  }

  update() {
    this.draw();
  }
}