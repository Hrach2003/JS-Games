// 1 ---  canvas.getContext("2d")                       - +
// 2 --- canvasText.fillRect                            - +
// 3 --- canvasText.fillStyle                           - +
// 4 --- canvasText.beginPath                           - +
// 5 --- canvasText.arc                                 - +
// 6 --- canvasText.fill                                - +



// 7 --- canvasText.font                                -
// 8 --- canvas.addEventListener( type : "mousemove")   -
// 9 ---  canvas.getBoundingClientRect()                -








const canvas = document.getElementById("pong");
const canvasText = canvas.getContext("2d");
//the user paddle
const user = {
    x : 0,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "white",
    score : 0
};
const com = {
    x : canvas.width - 10,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "white",
    score : 0
};
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    speed : 5,
    velocityX : Math.floor(Math.random() * 7),
    velocityY : Math.floor(Math.random() * 7),
    color : "white"
};
const net = {
    x : canvas.width/2 - 1,
    y : 0,
    width: 2,
    height: 10,
    color : "white"
};
//for drawing rectangle
function drawNet() {
    for(let i = 0;  i<=canvas.height; i+=15){
        drawRect(net.x, net.y+i, net.width, net.height, net.color);
    }
}

function drawRect( x , y , w , h , color) {
    canvasText.fillStyle = color;
    canvasText.fillRect(x,y,w,h);
}

// drawRect(0,0, canvas.width,canvas.height,"BLACK");
//for drawing circle

function drawCircle(x , y , r , color) {
    canvasText.fillStyle = color;
    canvasText.beginPath();
    canvasText.arc(x , y , r , 0 , Math.PI*2,false);
    canvasText.fill();
}


//draw text
function drawText(text , x , y , color) {
    canvasText.fillStyle = color;
    canvasText.font = "45px fantasy";
    canvasText.fillText(text , x , y);
}



function render() {
    //clear the canvas
    drawRect(0,0,canvas.width,canvas.height, "BlACK");

    //draw net
    drawNet();

    //draw score
    drawText(user.score , canvas.width/4 , canvas.width/6, "white");
    drawText(com.score , 3*canvas.width/4 , canvas.width/6 , "white");

    //draw the user and com paddle
    drawRect(user.x , user.y , user.width , user.height , user.color );
    drawRect(com.x , com.y , com.width , com.height , com.color );

    //draw the ball
    drawCircle(ball.x , ball.y , ball.radius , ball.color);

}
//control the user paddle
canvas.addEventListener("mousemove",movePaddle);

function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height/2;
}



//collision detection
function collision(b,p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right &&
        b.top < p.bottom;
}


function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speed = 5;
    ball.velocityX = Math.floor(Math.random() * 7) + 1;
    ball.velocityY = Math.floor(Math.random() * 7);
}
//update : pos , mov , score
function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;


    //AI to control the com paddle
    let computerLevel = 0.1;
    com.y += (ball.y - (com.y + com.height / 2)) * computerLevel;
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < canvas.width / 2) ? user : com;
    if (collision(ball, player)) {

        let collidePoint = ball.y - (player.y + player.height / 2);
        collidePoint = collidePoint / (player.height / 2);
        let angleRad = collidePoint * Math.PI / 4;

        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);


        ball.speed += 0.5;
    }
    if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}



//game init
function game() {
    render();
    update();
}
//loop
const framePerSecond = 100;
setInterval(game,1000/framePerSecond);


