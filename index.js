class Ball {
  constructor(velocityX, velocityY, positionX, positionY) {
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.positionX = positionX;
    this.positionY = positionY;
    this.div = this.create()
  }

  create() {
    // from MIT magic.js create function
     // random color
     var r = Math.floor(255*(Math.random()));
     var g = Math.floor(255*(Math.random()));
     var b = Math.floor(255*(Math.random()));        
     var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
 
     // set div attributes
     var div = document.createElement('div');
     div.id = 'ball';
     div.style.zIndex = '1';
     div.style.position = 'absolute';    
     div.style.left = this.positionX + 'px';    
     div.style.top = this.positionY + 'px';    
     div.style.width = '50px';    
     div.style.height = '50px';    
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
for(let i = 0; i < 15; i++)
{
    balls.push(new Ball(Math.floor(10*(Math.random())),
                        Math.floor(10*(Math.random())),
                        Math.floor(500*(Math.random())),
                        Math.floor(500*(Math.random()))))
}

let Xmax = 500;
let Xmin = 0;
let Ymax = 500;
let Ymin = 0;

function move2dballEdge() {
  for (let i = 0; i < balls.length; i++) {
    var ball = balls[i];

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
}

setInterval(move2dballEdge, 25);

// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics  blog about collision for future update about balls coliding with each other