// =====================
// VARIABLES
// =====================

let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 10;
let score = 0;

let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

// Sounds
const foodSound = new Audio("music/food.mp3");
const gameoverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

// Board
const board = document.getElementById("board");

// =====================
// GAME LOOP
// =====================

function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;

  lastPaintTime = ctime;
  gameEngine();
}

window.requestAnimationFrame(main);

// =====================
// COLLISION LOGIC
// =====================

function isCollide(snake) {
  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // Wall collision
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

// =====================
// GAME ENGINE
// =====================

function gameEngine() {
  // Collision
  if (isCollide(snakeArr)) {
    gameoverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to restart.");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    musicSound.play();
    return;
  }

  // Food eaten
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score++;
    scoreBox.innerHTML = "Score: " + score;

    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });

    let a = 2,b = 16;
    food = {
      x: Math.floor(Math.random() * (b - a + 1)) + a,
      y: Math.floor(Math.random() * (b - a + 1)) + a,
    };
  }

  // Move snake body
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  // Move head
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // =====================
  // RENDERING
  // =====================

  board.innerHTML = "";

  // Draw snake
  snakeArr.forEach((e, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) 
        snakeElement.classList.add("head");
    else 
        snakeElement.classList.add("snake");

    board.appendChild(snakeElement);
  });

  // Draw food
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// =====================
// CONTROLS
// =====================

window.addEventListener("keydown", (e) => {
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      if (inputDir.y !== 1) inputDir = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (inputDir.y !== -1) inputDir = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (inputDir.x !== 1) inputDir = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (inputDir.x !== -1) inputDir = { x: 1, y: 0 };
      break;
  }
});