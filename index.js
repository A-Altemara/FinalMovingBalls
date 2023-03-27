class Ball {
  constructor(velocityX, velocityY, positionX, positionY, radius) {
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.positionX = positionX;
    this.positionY = positionY;
    this.radius = radius;
    this.div = this.create()
  }

  create() {
    // from MIT magic.js create function
    // random color
    var r = Math.floor(255 * (Math.random()));
    var g = Math.floor(255 * (Math.random()));
    var b = Math.floor(255 * (Math.random()));
    var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';

    // set div attributes
    var div = document.createElement('div');
    div.id = 'ball';
    div.style.zIndex = '1';
    div.style.position = 'absolute';
    div.style.left = this.positionX + 'px';
    div.style.top = this.positionY + 'px';
    div.style.width = (this.radius * 2) + 'px';
    div.style.height = div.style.width;
    div.style.borderRadius = '50%';
    div.style.background = color;

    // Then append the whole thing onto the body
    document.getElementsByTagName('body')[0].appendChild(div);

    // default start position
    div.x = this.positionX;
    div.y = this.positionY;

    return div;
  }
}


var balls = []
for (let i = 0; i < 18; i++) {
  balls.push(new Ball(Math.floor(10 * (Math.random())),
    Math.floor(10 * (Math.random())),
    Math.floor(500 * (Math.random())),
    Math.floor(500 * (Math.random())),
    15))
}

let Xmax = 500;
let Xmin = 0;
let Ymax = 500;
let Ymin = 0;

function move2dballEdge() {
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    if (ball.positionX + ball.velocityX < Xmin || ball.positionX + ball.velocityX > Xmax) {
      ball.velocityX = -ball.velocityX;
    }

    if (ball.positionY + ball.velocityY < Ymin || ball.positionY + ball.velocityY > Ymax) {
      ball.velocityY = -ball.velocityY;
    }
    ball.positionX = ball.positionX + ball.velocityX;
    ball.positionY = ball.positionY + ball.velocityY;
    ball.div.style.left = ball.positionX + "px";
    ball.div.style.top = ball.positionY + "px";
  }
  // call function pass in values if it returns true they over lap.
  for (let i = 0; i < balls.length -1; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (ifCollide(balls[i], balls[j])) {
        var r = Math.floor(255 * (Math.random()));
        var g = Math.floor(255 * (Math.random()));
        var b = Math.floor(255 * (Math.random()));
        var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        balls[i].div.style.background = color;
        var r = Math.floor(255 * (Math.random()));
        var g = Math.floor(255 * (Math.random()));
        var b = Math.floor(255 * (Math.random()));
        var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        balls[j].div.style.background = color;
      }
    }
  }
}

// from blog post https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics by Spicy Yoghurt
// returns true if objects are colliding
let ifCollide = function (ball1, ball2) {
  //calulates distance between the circles
  let squareDistance = (ball1.positionX - ball2.positionX) * (ball1.positionX - ball2.positionX) + (ball1.positionY - ball2.positionY) * (ball1.positionY - ball2.positionY)

  return squareDistance <= ((ball1.radius + ball2.radius) * (ball1.radius + ball2.radius))

}

setInterval(move2dballEdge, 25);

