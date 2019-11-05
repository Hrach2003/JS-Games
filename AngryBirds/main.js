class Box {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}

let ground;

function setup() {
  createCanvas(600, 400);
  ground = new Box(0, canvas.heigth-200, canvas.width, 20)
}
function draw() {
  background(0);
  ground.show();
}
