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
  switch (e.key) {
    case "ArrowLeft":
      player.direction = "left";
      player.lastDirection = "left";
      console.log(player.lastDirection);
      break;

    case "ArrowRight":
      player.direction = "right";
      player.lastDirection = "right";
      console.log(player.lastDirection);
      break;

    case "ArrowUp":
      player.initiateJump();
      break;
  }
});

document.addEventListener("keyup", () => {
  player.direction = null;
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
  switch (player.direction) {
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
  switch (player.direction) {
    case "left":
      player.element.classList.add("jumping-left");
      break;
    case "right":
      player.element.classList.add("jumping-right");
      break;
  }
}

function movePlayerHorizontally() {
  if (player.direction === "left" || player.direction === "right") {
    const newPosition = `${player.move(player.direction)}px`;
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
    player.position[0] -= player.jumpSpeed * 1.5;
    player.element.style.bottom = `${player.position[0]}px`;
    if (player.position[0] === 0) {
      player.jumpCounter = 0;
      setStandingDirection();
    }
  }
}

//const pointsDivs = []; //created the array as static within the Rose class instead

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
          Rose.pointsDivs.push(pointsEarned);
          game.gameArea.appendChild(pointsEarned);
          pointsEarned.style.top = `${entity.position[0] - 10}px`;
          pointsEarned.style.left = `${entity.position[1] + 10}px`;

          //using the setTimeout to set divs for deletion once the animation has brought their opacity to 0
          setTimeout(() => {
            pointsEarned.classList.remove("points");
            pointsEarned.classList.add("old-points");
          }, 3000);
          break;

        case "fireball":
          player.getHurt(entity.lifeDecrement);
          playLosingSound();
          livesUl.lastChild.remove();
          player.element.classList.add("hurt");

          setTimeout(() => {
            player.element.classList.remove("hurt");
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

function clearOldPoints() {
  Rose.pointsDivs.forEach((div) => {
    if (div.classList.contains("old-points")) {
      const index = Rose.pointsDivs.indexOf(div);
      Rose.pointsDivs.splice(index, 1);
      div.remove();
    }
  });
}

function paintGameOver() {
  const gameOverMessageLine1 = document.createElement("p");
  const gameOverMessageLine2 = document.createElement("p");
  gameOverMessageLine1.classList.add("game-over");
  gameOverMessageLine2.classList.add("game-over");
  gameOverMessageLine1.textContent = "🪦";
  gameOverMessageLine2.textContent = "Game over";
  game.gameArea.classList.add("game-over");
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

  //player.direction is set to null at keyup
  if (player.direction !== null) {
    movePlayerHorizontally();
  }

  if (player.jumpCounter > 0){
    movePlayerVertically();
  }

  detectCollisions(Rose.rosesArray);
  detectCollisions(Fireball.fireballsArray);

  clearOldPoints();
}

let externalGameLoop = requestAnimationFrame(gameLoop);
