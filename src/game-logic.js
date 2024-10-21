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
function paintOnScreen(objectType){
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

//Get player back to the ground after a jump
function applyGravity(){
  if(player.position[0] > 0){
    const gravityRate = 5;
    player.position[0] -= gravityRate;
    player.element.style.bottom = `${player.position[0]}px`;
    console.log("going down");
    console.log(player.position[0]);
  } else if (player.position[0] <= 0) {
    player.jumpCounter = 0;
  }
}

//Move player with event listeners
document.addEventListener("keydown", (e) => {
  let newPosition = 0;
  console.log("keyyy");

  switch (e.key) {
    case "ArrowLeft":
      newPosition = `${player.move("left")}px`;
      player.element.style.left = newPosition;
      console.log("left");
      break;
      
      case "ArrowRight":
        newPosition = `${player.move("right")}px`;
        player.element.style.left = newPosition;
        console.log("right");
        break;

    case "ArrowUp":
        newPosition = `${player.jump()}px`;
        player.element.style.bottom = newPosition;
        break;
  }
});





/* function detectCollisionsRoses(){
  
  rosesArray.forEach(rose => {
    //this.elementWidth = this.element.getBoundingClientRect().width;
    //this.elementHeight = this.element.getBoundingClientRect().height;
    const rosePositionRight = rose.element.getBoundingClientRect().right;
    const rosePositionLeft = rose.element.getBoundingClientRect().left;
    const rosePositionTop = rose.element.getBoundingClientRect().top;
    const rosePositionBottom = rose.element.getBoundingClientRect().bottom; 
    
    if (rose){
      const score = player.earnPoints(rose.pointIncrement);
      const scoreTracker = document.getElementById("score");
      scoreTracker.textContent = score;
    }
  });
}
*/

/* function detectCollisionsFireballs(){
  
fireballsArray.forEach(fireball => {
  if (fireball){
    player.getHurt(fireball.lifeDecrement);
    }
  });
  
  //remove heart
} */


  function gameLoop() {
    requestAnimationFrame(gameLoop);
    game.frame++;

    if (game.frame % 200 === 0) {
      new Rose();
    }
    if (game.frame % 300 === 0) {
      new Fireball();
    }

    moveInanimateEntities(Rose.rosesArray);
    moveInanimateEntities(Fireball.fireballsArray);

    //movePlayer

    if (player.jumpCounter > 0 && game.frame % 2 === 0) {
      applyGravity();
    }

    //detectCollisions();
  }

  requestAnimationFrame(gameLoop);


  function paintGameOver(){
    game.gameArea.classList.add("game-over");
    const gameOverMessage = document.createElement("p");
    gameOverMessage.setAttribute("id", "game-over");
    gameOverMessage.textContent = "Game over!";
    //Remove all the elements of the game area
    game.gameArea.replaceChildren(gameOverMessage);
  }