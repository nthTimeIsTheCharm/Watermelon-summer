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
  switch (e.key) {
    case "ArrowLeft":
      player.currentDirection = "left";
      player.lastDirection = "left";
      break;

    case "ArrowRight":
      player.currentDirection = "right";
      player.lastDirection = "right";
      break;

    case "ArrowUp":
      player.initiateJump();
      break;
  }
});

document.addEventListener("keyup", () => {
  player.currentDirection = null;
  if (player.position[0] === 0) {
    setStandingDirection();
  }
});

function removeMovementClasses() {
  player.element.classList.remove("standing-right");
  player.element.classList.remove("standing-left");
  player.element.classList.remove("walking-right");
  player.element.classList.remove("walking-left");
  player.element.classList.remove("jumping-right");
  player.element.classList.remove("jumping-left");
}

function setMovingDirectionWalk() {
  removeMovementClasses();
  switch (player.currentDirection) {
    case "left":
      player.element.classList.add("walking-left");
      break;
    case "right":
      player.element.classList.add("walking-right");
      break;
  }
}

function setMovingDirectionJump() {
  removeMovementClasses();
  switch (player.currentDirection) {
    case "left":
      player.element.classList.add("jumping-left");
      break;
    case "right":
      player.element.classList.add("jumping-right");
      break;
  }
}

function movePlayerHorizontally() {
  if (
    player.currentDirection === "left" ||
    player.currentDirection === "right"
  ) {
    const newPosition = `${player.move(player.currentDirection)}px`;
    player.element.style.left = newPosition;

    if (player.position[0] === 0) {
      //Player on the ground
      setMovingDirectionWalk();
    } else if (player.position[0] > 0) {
      //Player jumping
      setMovingDirectionJump();
    }
  }
}

function setStandingDirection() {
  removeMovementClasses();
  if (player.lastDirection === "left") {
    player.element.classList.add("standing-left");
  } else if (player.lastDirection === "right") {
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

function setJumpingDirection() {
  removeMovementClasses();
  switch (player.lastDirection) {
    case "left":
      player.element.classList.add("jumping-left");
      break;

    case "right":
      player.element.classList.add("jumping-right");
      break;
  }
}

function jumpGradually() {
  newPosition = `${player.move("up")}px`;
  player.element.style.bottom = newPosition;
  player.targetJumpHeight -= player.jumpSpeed;
  setJumpingDirection();
}
//Get player back to the ground after a jump
function applyGravity() {
  if (player.position[0] > 0) {
    /* if (player.position[0] < player.jumpSpeed * 1.5) {
      player.position[0] = 0; //to avoid negative values for the player's vertical position
    } else {
      player.position[0] -= player.jumpSpeed * 1.5;
    }

    player.element.style.bottom = `${player.position[0]}px`;

    if (player.position[0] === 0) {
      player.jumpCounter = 0;
      setStandingDirection();
    } */

    if (player.position[0] < (player.jumpSpeed * 1.5)){
      player.position[0] = 0; //to avoid negative values for the player's vertical position
      player.element.style.bottom = `${player.position[0]}px`;
      player.jumpCounter = 0;
      setStandingDirection();
    } else {
      player.element.style.bottom = `${player.position[0]}px`;
      player.position[0] -= player.jumpSpeed * 1.5;
    }
  }
}

function updateScore() {
  const scoreTracker = document.getElementById("score-value");
  scoreTracker.textContent = player.score;
}

function showPointsEarned(entity) {
  const pointsEarnedDiv = document.createElement("div");
  pointsEarnedDiv.textContent = `+ ${entity.pointIncrement}`;
  pointsEarnedDiv.classList.add("points");
  Rose.pointsEarnedDivs.push(pointsEarnedDiv);
  game.gameArea.appendChild(pointsEarnedDiv);
  pointsEarnedDiv.style.top = `${entity.position[0] - 10}px`;
  pointsEarnedDiv.style.left = `${entity.position[1] + 10}px`;
  return pointsEarnedDiv;
}

function setPointsUpForDeletion(pointsEarnedDiv) {
  //using the setTimeout to set divs for deletion
  //once the animation has brought their opacity to 0
  setTimeout(() => {
    pointsEarnedDiv.classList.remove("points");
    pointsEarnedDiv.classList.add("old-points");
  }, 3000);
}

function collideWithRose(entity) {
  player.earnPoints(entity.pointIncrement); //HERE
  playWinningSound();
  updateScore();
  const pointsEarnedDiv = showPointsEarned(entity);
  setPointsUpForDeletion(pointsEarnedDiv);
}

function makePlayerBlink() {
  player.element.classList.add("hurt");

  setTimeout(() => {
    player.element.classList.remove("hurt");
  }, 2000);
}

function removeOneHeart() {
  livesUl.lastChild.remove();
}

function collideWithFireball(entity) {
  player.getHurt(entity.lifeDecrement); //HERE
  playLosingSound();
  removeOneHeart();
  makePlayerBlink();

  if (player.lives === 0) {
    playGameOverSound();
    game.gameOver();
  }
}

function manageCollision(entity) {
  switch (entity.type) {
    case "rose":
      collideWithRose(entity);
      break;

    case "fireball":
      collideWithFireball(entity);
      break;
  }
}

function detectCollisions(entitiesArray) {
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
      manageCollision(entity);
      entity.disappear();
    }
  });
}

function clearOldPoints() {
  Rose.pointsEarnedDivs.forEach((div) => {
    if (div.classList.contains("old-points")) {
      const index = Rose.pointsEarnedDivs.indexOf(div);
      Rose.pointsEarnedDivs.splice(index, 1);
      div.remove();
    }
  });
}

function showGameOver() {
  //Create elements
  const gameOverMessageLine1 = document.createElement("p");
  const gameOverMessageLine2 = document.createElement("p");
  gameOverMessageLine1.textContent = "🪦";
  gameOverMessageLine2.textContent = "Game over";

  //Style game area
  game.gameArea.classList.remove("game-live");
  game.gameArea.classList.add("game-over");

  //Remove all elements and add the gameover message
  game.gameArea.replaceChildren(gameOverMessageLine1);
  game.gameArea.appendChild(gameOverMessageLine2);
}

function gameLoop() {
  internalGameLoop = requestAnimationFrame(gameLoop);
  game.frame++;

  //One rose and one fireball appears within a designated interval
  //but at a random frame
  //i.e. One rose each 300 frames, but at a random point within those 300 frames
  // Create new roses and fireballs, if we've reached the random frame
  if (game.frame === roseNextFrame) {
    new Rose();
  }
  if (game.frame === fireballNextFrame) {
    new Fireball();
  }

  // Change the random frame after each interval
  if (game.frame % Rose.frequency === 0) {
    roseNextFrame = game.frame + Rose.getNewFrameNumber();
  }
  if (game.frame % Fireball.frequency === 0) {
    fireballNextFrame = game.frame + Fireball.getNewFrameNumber();
  }

  moveInanimateEntities(Rose.rosesArray);
  moveInanimateEntities(Fireball.fireballsArray);

  //player.currentDirection is set to null at keyup
  if (player.currentDirection !== null) {
    movePlayerHorizontally();
  }

  if (player.jumpCounter > 0) {
    movePlayerVertically();
  }

  detectCollisions(Rose.rosesArray);
  detectCollisions(Fireball.fireballsArray);
  clearOldPoints();
}

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

//Add initial values for the first rose and the first fireball to appear
let roseNextFrame = Rose.frequency;
let fireballNextFrame = Fireball.frequency;

//Start the game loop
let internalGameLoop;
let externalGameLoop = requestAnimationFrame(gameLoop);
