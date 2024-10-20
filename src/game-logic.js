//Speed values
const playerSpeed = 5;
const roseSpeed = 1;
const fireballSpeed = 1;

//Direction values
const playerDirection = null;
const roseDirection = "down";
const fireballDirection = "left";

//Create new game
const game = new Game();

//Create player and paint lives
const player = new Player(playerSpeed, playerDirection);
const livesUl = document.querySelector("#lives ul");
for (let i = 1; i <= player.lives; i++) {
  const lifeLi = document.createElement("li");
  lifeLi.textContent = "❤️";
  livesUl.appendChild(lifeLi);
}

//Create inanimate entities
function createRose() {
  new Rose(roseSpeed, roseDirection, "rose");
}

function createFireball() {
  new Fireball(fireballSpeed, fireballDirection, "fireball");
}

//Continuously move inanimate entities

function moveInanimateEntities(entitiesArray) {
  entitiesArray.forEach((entity) => {
    const newPosition = `${entity.move()}px`;

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

//Move player with event listeners
document.addEventListener("keydown", (e) => {
  let newPosition;
  console.log("keyyy");

  switch (e.key) {
    case "ArrowLeft":
      newPosition = player.move();
      player.element.style.left = newPosition;
      console.log("left");
      break;
      
      case "ArrowRight":
        player.move();
        console.log("right");
        break;

    case "arrowUp":
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

//Game loop
let frames = 0;


function gameLoop() {
  requestAnimationFrame(gameLoop);
  frames++;

  if (frames % 200 === 0) {
    createRose();
  }
  if (frames % 300 === 0) {
    createFireball();
  }

  moveInanimateEntities(Rose.rosesArray);
  moveInanimateEntities(Fireball.fireballsArray);

  //detectCollisions();
  //movePlayer
}

requestAnimationFrame(gameLoop);