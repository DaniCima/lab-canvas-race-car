const canvas = document.querySelector("canvas");
canvas.style.border = "2px solid grey";
let ctx = canvas.getContext("2d");
let startScreen = document.querySelector(".game-intro");
let gOverScreen = document.querySelector(".game-over");

let intervalId = 0;
let isGameOver = false;

let score = 0;
let background = new Image();
background.src = "./images/road.png";
let car = new Image();
car.src = "./images/car.png";

let carX = 250;
let carY = 500;
let carWidth = 80;
let carLength = 130;

//obstacle car
let obCar = new Image();
obCar.src = "./images/car.png";
let obCarX = 300;
let obCarY = -400;

let obCar2 = new Image();
obCar2.src = "./images/car.png";
let obCar2X = 300;
let obCar2Y = -400;

let obCar3 = new Image();
obCar3.src = "./images/car.png";
let obCar3X = 300;
let obCar3Y = -400;


window.onload = () => {
  canvas.style.display = "none";
  gOverScreen.style.display = "none";
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight" && carX + carWidth < canvas.width - 50) {
      carX += 4;
    } else if (event.code === "ArrowLeft" && carX > 50) {
      carX -= 4;
    } else if (event.code === "ArrowUp" && carX > 50){
      carY -= 4;
    } else if (event.code === "ArrowDown" && carX > 50){
      carY +=4;
    }
  });

  function startGame() {
   canvas.style.display = "block";
    startScreen.style.display = "none";
    //drawing the background and the cars
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, carWidth, carLength);
    ctx.drawImage(obCar, obCarX, obCarY, carWidth, carLength);
    //obCar movement
    obCarY += 2;
    if (obCarY > canvas.height) {
      obCarY = -400;
      score++;
    }
    //collision with cars
    if (
      carY < obCarY + carLength &&
      carX < obCarX + carWidth - 5 &&
      carX + carWidth > obCarX &&
      carY + carLength > obCarY
    ) {
      isGameOver = true;
    }
    //scoreboard
    ctx.font = "30px Georgia";
    ctx.fillText(`Score:${score}`, 100, 40);
    intervalId = requestAnimationFrame(startGame);

    if (score > 5) {
      ctx.drawImage(obCar2, obCar2X, obCar2Y, carWidth, carLength);
    }
    // for (i=0; i<)

    if (isGameOver) {
      cancelAnimationFrame(intervalId);
      canvas.style.display = "none";
      gOverScreen.style.display = "block";
    }
  }
}