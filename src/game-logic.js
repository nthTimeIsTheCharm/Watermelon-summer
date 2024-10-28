//Create new game
const game = new Game();

//Create player and paint lives
const player = new Player();
const livesUl = document.querySelector("#lives ul");
for (let i = 1; i <= player.lives; i++) {
  const lifeLi = document.createElement("li");
  lifeLi.textContent = "❤️";
  livesUl.appendChild(lifeLi);
}

//Place inanimate entities
function placeInGameArea(element, axis, position) {
  if (axis === "x-axis") {
    element.style.left = `${position}px`;
  } else if (axis === "y-axis") {
    element.style.top = `${position}px`;
  }
}

//Print inanimate entities
function paintOnScreen(objectType) {
  const element = document.createElement("div");
  element.classList.add(objectType);
  InanimateEntity.parentElement.appendChild(element);
  return element;
}

//Add sounds
function playJumpSound() {
  const audio = new Audio("./audio/jump-sound.mp3");
  audio.play();
}

function playWinningSound() {
  const audio = new Audio("./audio/winning-sound.mp3");
  audio.play();
}

function playLosingSound() {
  const audio = new Audio("./audio/losing-sound.mp3");
  audio.play();
}

function playGameOverSound() {
  const audio = new Audio("./audio/gameover-sound.mp3");
  audio.play();
}



//Continuously move inanimate entities
function moveInanimateEntities(entitiesArray) {
  entitiesArray.forEach((entity) => {
    const newPosition = `${entity.move(entity.direction)}px`;

    switch (entity.type) {
      case "rose":
        entity.element.style.top = newPosition;
        break;
      case "fireball":
        entity.element.style.left = newPosition;
        break;
    }
  });
}

//Player event listeners

document.addEventListener("keydown", (e) => {
  let newPosition = 0;

  switch (e.key) {
    case "ArrowLeft":
      player.direction = "left";
      player.lastDirection = "left";
      break;

    case "ArrowRight":
      player.direction = "right";
      player.lastDirection = "right";
      break;

    case "ArrowUp":
      player.initiateJump();
      break;
  }
});

document.addEventListener("keyup", () => {
  player.direction = "null";
  maintainCurrentDirectionStand();
});

function movePlayerHorizontally() {
  const newPosition = `${player.move(player.direction)}px`;
  switch (player.direction) {
    case "left":
      player.element.style.left = newPosition;
      if(player.position[0] === 0){
        player.element.classList.remove("walking-right");
        player.element.classList.remove("standing-right");
        player.element.classList.remove("standing-left");
        player.element.classList.add("walking-left");
      } else if (player.element.classList.contains("jumping-right")){
        player.element.classList.remove("jumping-right");
        player.element.classList.add("jumping-left");
      }
      break;

    case "right":
      player.element.style.left = newPosition;
      if (player.position[0] === 0) {
        player.element.classList.remove("walking-left");
        player.element.classList.remove("standing-left");
        player.element.classList.remove("standing-right");
        player.element.classList.add("walking-right");
      } else if (player.element.classList.contains("jumping-left")) {
        player.element.classList.remove("jumping-left");
        player.element.classList.add("jumping-right");
      }
      break;
  }
}

function maintainCurrentDirectionStand() {
  if (
    /* player.element.classList.contains("walking-left") ||
    player.element.classList.contains("jumping-left") */
    player.lastDirection === "left"
  ) {
    player.element.classList.remove("walking-left");
    player.element.classList.remove("jumping-left");
    player.element.classList.add("standing-left");
  } else if (
    /* player.element.classList.contains("walking-right") ||
    player.element.classList.contains("jumping-right") */
    player.lastDirection === "right"
  ) {
    player.element.classList.remove("walking-right");
    player.element.classList.remove("jumping-right");
    player.element.classList.add("standing-right");
  }
}

function movePlayerVertically() {
  if (player.targetJumpHeight > 0) {
    jumpGradually();
  } else if (player.position[0] > 0) {
    applyGravity();
  }
}

function jumpGradually() {
  newPosition = `${player.move("up")}px`;
  player.element.style.bottom = newPosition;
  player.targetJumpHeight -= player.jumpSpeed;
  setJumpDirection();
  removeMovementClasses();
}

function setJumpDirection(){
  if (
    player.direction === "left" ||
    player.element.classList.contains("walking-left") ||
    player.element.classList.contains("standing-left")
  ) {
    player.element.classList.add("jumping-left");
  } else if (
    player.direction === "right" ||
    player.element.classList.contains("walking-right") ||
    player.element.classList.contains("standing-right")
  ) {
    player.element.classList.add("jumping-right");
  }
}

function removeMovementClasses(){
  player.element.classList.remove("standing-right");
  player.element.classList.remove("standing-left");
  player.element.classList.remove("walking-right");
  player.element.classList.remove("walking-left");
}

//Get player back to the ground after a jump
function applyGravity() {
  if (player.position[0] > 0) {
    player.position[0] -= player.jumpSpeed;
    player.element.style.bottom = `${player.position[0]}px`;
    if (player.position[0] === 0) {
      player.jumpCounter = 0;
      maintainCurrentDirectionStand();
      player.element.classList.remove("jumping-right");
      player.element.classList.remove("jumping-left");
    }
  }
}

const pointsDivs = [];

function detectCollisions(entitiesArray) {
  const playerWidth = player.element.getBoundingClientRect().width;
  const playerHeight = player.element.getBoundingClientRect().height;
  const playerPositionRight = player.element.getBoundingClientRect().right;
  const playerPositionLeft = player.element.getBoundingClientRect().left;
  const playerPositionTop = player.element.getBoundingClientRect().top;
  const playerPositionBottom = player.element.getBoundingClientRect().bottom;

  entitiesArray.forEach((entity) => {
    const entityPositionRight = entity.element.getBoundingClientRect().right;
    const entityPositionLeft = entity.element.getBoundingClientRect().left;
    const entityPositionTop = entity.element.getBoundingClientRect().top;
    const entityPositionBottom = entity.element.getBoundingClientRect().bottom;

    if (
      entityPositionRight >= playerPositionLeft &&
      entityPositionLeft <= playerPositionRight &&
      entityPositionBottom >= playerPositionTop &&
      entityPositionTop <= playerPositionBottom
    ) {
      switch (entity.type) {
        case "rose":
          player.earnPoints(entity.pointIncrement);
          playWinningSound();

          // Update score
          const scoreTracker = document.getElementById("score-value");
          scoreTracker.textContent = player.score;
          
          //Show points earned
          const pointsEarned = document.createElement("div");
          pointsEarned.textContent = `+ ${entity.pointIncrement}`;
          pointsEarned.classList.add("points");
          pointsDivs.push(pointsEarned);
          game.gameArea.appendChild(pointsEarned);
          pointsEarned.style.top = `${entity.position[0] - 10}px`;
          pointsEarned.style.left = `${entity.position[1] + 10}px`;
          
          //using the setTimeout to set divs for deletion once the animation has brought their opacity to 0
          setTimeout(()=>{
            pointsEarned.className = "";
            pointsEarned.classList.add("old-points");
          }, 3000);
          break;

        case "fireball":
          player.getHurt(entity.lifeDecrement);
          playLosingSound();
          livesUl.lastChild.remove();
          player.element.classList.add("hit");
          setTimeout(()=>{
            player.element.classList.remove("hit");
          }, 2000);
          if (player.lives === 0) {
             playGameOverSound();
            game.gameOver();
          }
          break;
      }

      entity.disappear();
    }
  });
}

function clearOldPoints(){
  pointsDivs.forEach((div)=>{
    if (div.classList.contains("old-points")){
      const index = pointsDivs.indexOf(div);
      pointsDivs.splice(index, 1);
      div.remove();
    }
  });
}

function paintGameOver() {
  game.gameArea.classList.add("game-over");
  const gameOverMessageLine1 = document.createElement("p");
  const gameOverMessageLine2 = document.createElement("p");
  gameOverMessageLine1.setAttribute("id", "game-over");
  gameOverMessageLine2.setAttribute("id", "game-over");
  gameOverMessageLine1.textContent = "🪦";
  gameOverMessageLine2.textContent = "Game over";
  //Remove all the elements of the game area
  game.gameArea.replaceChildren(gameOverMessageLine1);
  game.gameArea.appendChild(gameOverMessageLine2);
}

let internalGameLoop;

function gameLoop() {
  internalGameLoop = requestAnimationFrame(gameLoop);
  game.frame++;

  if (game.frame % 200 === 0) {
    new Rose();
  }
  if (game.frame % 300 === 0) {
    new Fireball();
  }

  moveInanimateEntities(Rose.rosesArray);
  moveInanimateEntities(Fireball.fireballsArray);

  movePlayerHorizontally();
  movePlayerVertically();

  detectCollisions(Rose.rosesArray);
  detectCollisions(Fireball.fireballsArray);

  clearOldPoints();
}

let externalGameLoop = requestAnimationFrame(gameLoop);
