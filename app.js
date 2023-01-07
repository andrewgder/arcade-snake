// game variables
const squareSize = 25;
const rows = 20;
const cols = 20;
let gameBoard;
let gameContext;
let directionX = 0;
let directionY = 0;
let snakeBody = [];

//creates snake head starting point
let snakeHeadWidth = squareSize * 10;
let snakeHeadHeight = squareSize * 10;

//randomly spawns food on the board
function spawnFood() {
  foodWidth = Math.floor(Math.random() * cols) * squareSize;
  foodHeight = Math.floor(Math.random() * rows) * squareSize;
}
// draws board during page load and starts the game
window.onload = function () {
  gameBoard = document.querySelector("#board");
  gameBoard.height = rows * squareSize;
  gameBoard.width = cols * squareSize;
  gameContext = gameBoard.getContext("2d");
  spawnFood();
  document.addEventListener("keyup", direction);
  //using interval to refresh the board
  setInterval(gameUpdate, 100);
};

// refreshes the game
function gameUpdate() {
  gameContext.fillStyle = "#2E2E2E";
  gameContext.fillRect(0, 0, gameBoard.width, gameBoard.height);

  gameContext.fillStyle = "#FC2E20";
  gameContext.fillRect(foodWidth, foodHeight, squareSize, squareSize);
  //condition to check if snake eats the food
  if (snakeHeadWidth == foodWidth && snakeHeadHeight == foodHeight) {
    snakeBody.push(foodWidth, foodHeight);
    spawnFood();
  }

  gameContext.fillStyle = "blue";
  snakeHeadWidth += directionX * squareSize;
  snakeHeadHeight += directionY * squareSize;
  gameContext.fillRect(snakeHeadWidth, snakeHeadHeight, squareSize, squareSize);
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
  } else if (event.code == "ArrowRight" && directionX != 1) {
    directionX = 1;
    directionY = 0;
  }
}
