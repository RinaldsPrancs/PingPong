function drawLeft() {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(leftSlider.x, leftSlider.y, 10, 100);
}

function drawRight() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(rightSlider.x, rightSlider.y, 10, 100);
  }

function resetRound(){
    resetBall();
    resetLeft();
    resetRight();
    speed_x = randomizeSpeed();
    speed_y = randomizeSpeed();
    leftSlider = { x: 50, y: canvas.height / 2 - 50 };
    rightSlider = { x: canvas.width-50, y: canvas.height / 2 - 50 };
    drawLeft();
    drawRight();
    ball = {
        x: canvas.width / 2 - 5,
        y: canvas.height / 2 - 5,
        width: 10,
        height: 10,
    };
}


function drawBall() {
  const context = canvas.getContext("2d");
  ball.x += speed_x;
  ball.y += speed_y;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);


  if (ball.x <=0){
    scoreRight += 1;
    scoreText.textContent = scoreLeft + " : " + scoreRight;
    resetRound();
  }

  if (ball.x >= canvas.width - ball.width) {
    scoreLeft += 1;
    scoreText.textContent = scoreLeft + " : " + scoreRight;
    resetRound();
  }

  if (ball.y >= canvas.height - ball.height || ball.y <= 0) {
    speed_y = -speed_y;
  }

  if (
    ball.x <= leftSlider.x + 12 &&
    ball.x >= leftSlider.x - 2 &&
    ball.y >= leftSlider.y - 2 &&
    ball.y <= leftSlider.y + 102
  ) {
    speed_x = -speed_x;
  }
  if (
    ball.x >= rightSlider.x -12 &&
    ball.x <= rightSlider.x + 12 &&
    ball.y >= rightSlider.y - 2 &&
    ball.y <= rightSlider.y + 102
  ) {
    speed_x = -speed_x;
  }
}

function resetBall() {
  const context = canvas.getContext("2d");
  context.clearRect(ball.x, ball.y, 10, 10);
}

function resetLeft() {
  const context = canvas.getContext("2d");
  context.clearRect(leftSlider.x, leftSlider.y, 10, 100);
}

function resetRight() {
    const context = canvas.getContext("2d");
    context.clearRect(rightSlider.x, rightSlider.y, 10, 100);
  }


let leftSlider = { x: 50, y: canvas.height / 2 - 50 };
let rightSlider = { x: canvas.width-50, y: canvas.height / 2 - 50 };
let ball = {
  x: canvas.width / 2 - 5,
  y: canvas.height / 2 - 5,
  width: 10,
  height: 10,
};
let scoreLeft = 0;
let scoreRight = 0;
const scoreText = document.getElementById("score");
scoreText.textContent = scoreLeft + " : " + scoreRight;
let speed_x = randomizeSpeed();
let speed_y = randomizeSpeed();

if (speed_x === 0) {
  speed_x = 1;
}
if (speed_y === 0) {
  speed_y = 1;
}

function randomizeSpeed(){
    let speed = Math.floor(Math.random() * 7) - 3;
    if (speed === 0) {
        speed = 1;
      }
    return speed;
}

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  w:false,
  s:false
};
let gameRunning = false;
document.addEventListener("keydown", function (event) {
  if (event.key in keys) {
    keys[event.key] = true;
    event.preventDefault();
    console.log(event.key)
  }
  if (event.key === " " && !gameRunning) {
    gameRunning = true;
    gameLoop();
    const heading = document.getElementById("hiddenHeading3");
        heading.style.display = "none";
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key in keys) {
    keys[event.key] = false;
  }
});

function gameLoop() {
    if (scoreLeft >=5 || scoreRight >=5){
        const heading = document.getElementById("hiddenHeading");
        heading.style.display = "block";
        const heading2 = document.getElementById("hiddenHeading2");
        heading2.style.display = "block";
        return 1;
    }

  resetBall();
  drawBall();
  
  if (keys.w) {
    resetLeft();
    if (leftSlider.y >= -3){
      leftSlider.y -= 3;
    }
    drawLeft();
  }
  if (keys.s) {
    resetLeft();
    if (leftSlider.y <= canvas.height-100){
      leftSlider.y += 3;
    }
    drawLeft();
  }
  if (keys.ArrowUp) {
    resetRight();
    if (rightSlider.y >= -3){
      rightSlider.y -= 3;
    }
    drawRight();
  }
  if (keys.ArrowDown) {
    resetRight();
    if (rightSlider.y <= canvas.height-100){
      rightSlider.y += 3;
    }
    drawRight();
  }
  

  requestAnimationFrame(gameLoop);
}

drawLeft();
drawRight();
drawBall();


// gameLoop();

