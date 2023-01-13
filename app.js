// game variables
const squareSize = 25;
const rows = 20;
const cols = 20;
let gameBoard;
let gameContext;
let directionX = 0;
let directionY = 0;
let snakeBody = [];
let gameOver = false;
let instructions = document.querySelector("#myPopup");
let score = 0;
let highScore = 0;
let playerScore = document.querySelector(".score");
let playerHighScore = document.querySelector(".highScore");
let playAgainDiv = document.querySelector(".controls");
let playAgainButton = document.createElement("button");
playAgainButton.innerText = "Play Again!";
let gameOverScreen = document.querySelector(".gameOverOverlay");
let gameOverText = document.querySelector(".gameOverText");
let startButton = document.querySelector(".startButton");
let gameInterval;

//start game function
startButton.addEventListener("click", start);
function start() {
  gameBoard = document.querySelector("#board");
  gameBoard.height = rows * squareSize;
  gameBoard.width = cols * squareSize;
  gameContext = gameBoard.getContext("2d");
  spawnFood();
  document.addEventListener("keyup", direction);
  highScore = localStorage.getItem("savedHighScore");
  startInterval();
}
//set interval
function startInterval() {
  gameInterval = setInterval(gameUpdate, 100);
}
//stops interval
function stop() {
  clearInterval(gameInterval);
}

//creates snake head starting point
let snakeHeadWidth = squareSize * 10;
let snakeHeadHeight = squareSize * 10;

//randomly spawns food on the board
function spawnFood() {
  foodWidth = Math.floor(Math.random() * cols) * squareSize;
  foodHeight = Math.floor(Math.random() * rows) * squareSize;
}

// refreshes the game during gameplay
function gameUpdate() {
  playerScore.innerHTML = "Score: " + score;
  playerHighScore.innerHTML = "High Score: " + highScore;
  if (gameOver) {
    return;
  }
  //draws board
  gameContext.fillStyle = "#2E2E2E";
  gameContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
  //draws food
  gameContext.fillStyle = "#FC2E20";
  gameContext.fillRect(foodWidth, foodHeight, squareSize, squareSize);
  //condition to check if snake eats the food
  if (snakeHeadWidth == foodWidth && snakeHeadHeight == foodHeight) {
    snakeBody.push([foodWidth, foodHeight]);
    spawnFood();
    score += 1;
    checkScore();
  }

  // tail of snake moves to previous body's coordinates
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  // moves the first array element of snake body to snake head's position
  if (snakeBody.length) {
    snakeBody[0] = [snakeHeadWidth, snakeHeadHeight];
  }

  gameContext.fillStyle = "blue";
  snakeHeadWidth += directionX * squareSize;
  snakeHeadHeight += directionY * squareSize;
  gameContext.fillRect(snakeHeadWidth, snakeHeadHeight, squareSize, squareSize);
  for (let i = 0; i < snakeBody.length; i++) {
    gameContext.fillRect(
      snakeBody[i][0],
      snakeBody[i][1],
      squareSize,
      squareSize
    );
  }
  //Game over conditions
  // checks if snake goes out outside of canvas
  if (
    snakeHeadWidth < 0 ||
    snakeHeadWidth >= cols * squareSize ||
    snakeHeadHeight < 0 ||
    snakeHeadHeight >= rows * squareSize
  ) {
    //creates overlay for game over screen with button
    gameOverText.innerHTML = "Game Over! </br> Score: " + score + "</br>";
    gameOverText.appendChild(playAgainButton);
    gameOverScreen.style.display = "flex";
    gameOver = true;
  }

  //checks if snake head hits its own body
  for (let i = 0; i < snakeBody.length; i++) {
    if (
      snakeHeadWidth == snakeBody[i][0] &&
      snakeHeadHeight == snakeBody[i][1]
    ) {
      //creates overlay for game over screen with button
      gameOverScreen.style.display = "flex";
      gameOverText.innerHTML = "Game Over!  </br> Score: " + score + "</br>";
      gameOverText.appendChild(playAgainButton);
      gameOverScreen.style.display = "flex";
      gameOver = true;
    }
  }
}

//changes direction of snake
function direction(event) {
  if (event.code == "ArrowUp" && directionY != 1) {
    directionX = 0;
    directionY = -1;
  } else if (event.code == "ArrowDown" && directionY != -1) {
    directionX = 0;
    directionY = 1;
  } else if (event.code == "ArrowLeft" && directionX != 1) {
    directionX = -1;
    directionY = 0;
  } else if (event.code == "ArrowRight" && directionX != -1) {
    directionX = 1;
    directionY = 0;
  } else {
    directionX = 0;
    directionY = 0;
  }
}

//check if score is the highest
function checkScore() {
  if (highScore <= score) {
    highScore = score;
  } else {
    highScore += 1;
  }
}

//play again function
playAgainButton.addEventListener("click", playAgain);
function playAgain() {
  gameOverScreen.style.display = "none";
  //places snake head at starting position
  snakeHeadWidth = squareSize * 10;
  snakeHeadHeight = squareSize * 10;
  //resets snake body
  snakeBody = [];
  //stops from the page from redrawing the canvas
  stop();
  //resets the direction parameter
  direction(" ");
  gameOver = false;
  start();
}
