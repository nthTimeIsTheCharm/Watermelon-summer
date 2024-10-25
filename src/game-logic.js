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
      break;

    case "ArrowRight":
      player.direction = "right";
      break;

    case "ArrowUp":
      player.initiateJump();
      break;
  }
});

document.addEventListener("keyup", () => {
  player.direction = "null";
});

function movePlayerHorizontally() {
  const newPosition = `${player.move(player.direction)}px`;
  switch (player.direction) {
    case "left":
      player.element.style.left = newPosition;
      player.element.className = "";
      player.element.classList.add("walking-left");
      break;

    case "right":
      player.element.className = "";
      player.element.classList.add("walking-right");
      player.element.style.left = newPosition;
      break;
  }
}

function maintainCurrentDirectionWalk() {
  if (
    player.element.classList.contains("walking-left") ||
    player.element.classList.contains("standing-left")
  ) {
    player.element.className = "";
    player.element.classList.add("walking-left");
  } else if (
    player.element.classList.contains("walking-right") ||
    player.element.classList.contains("standing-right")
  ) {
    player.element.className = "";
    player.element.classList.add("walking-right");
  }
}

function maintainCurrentDirectionStand() {
  if (
    player.element.classList.contains("walking-left") ||
    player.element.classList.contains("standing-left")
  ) {
    player.element.className = "";
    player.element.classList.add("standing-left");
  } else if (
    player.element.classList.contains("walking-right") ||
    player.element.classList.contains("standing-right")
  ) {
    player.element.className = "";
    player.element.classList.add("standing-right");
  }
}

function movePlayerVertically() {
  if (player.targetJumpHeight > 0) {
    maintainCurrentDirectionWalk();
    jumpGradually();
  } else {
    applyGravity();
  }
}

function jumpGradually() {
  newPosition = `${player.move("up")}px`;
  player.element.style.bottom = newPosition;
  player.targetJumpHeight -= player.jumpSpeed;
}

//Get player back to the ground after a jump
function applyGravity() {
  if (player.position[0] > 0) {
    const gravityRate = player.jumpSpeed * 1.2;
    player.position[0] -= gravityRate;
    player.element.style.bottom = `${player.position[0]}px`;
  } else if (player.position[0] <= 0) {
    player.jumpCounter = 0;
    maintainCurrentDirectionStand();
  }
}

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
          const scoreTracker = document.getElementById("score-value");
          player.earnPoints(entity.pointIncrement);
          scoreTracker.textContent = player.score;
          break;

        case "fireball":
          player.getHurt(entity.lifeDecrement);
          livesUl.lastChild.remove();
          if (player.lives === 0) {
            game.gameOver();
          }
          break;
      }

      entity.disappear();
    }
  });
}

function paintGameOver() {
  game.gameArea.classList.add("game-over");
  const gameOverMessage = document.createElement("p");
  gameOverMessage.setAttribute("id", "game-over");
  gameOverMessage.textContent = "Game over";
  const skull = document.createElement("li");
  skull.textContent = "🪦";
  livesUl.appendChild(skull);
  //Remove all the elements of the game area
  game.gameArea.replaceChildren(gameOverMessage);
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

  /* if (player.jumpCounter > 0 && game.frame % 2 === 0) {
      applyGravity();
    } */

  detectCollisions(Rose.rosesArray);
  detectCollisions(Fireball.fireballsArray);
}

let externalGameLoop = requestAnimationFrame(gameLoop);
