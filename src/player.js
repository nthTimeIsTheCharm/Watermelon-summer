class Player extends GameEntity {
  constructor(speed, direction, position) {
    super(speed, direction, position);
    this.speed = 5;
    this.currentDirection = null;
    this.lastDirection = "right";
    this.element = document.getElementById("player");
    this.position.push(0, this.getPlayerPositionX());
    
    this.score = 0;
    this.lives = 5;

    this.jumpSpeed = 5;
    this.jumpCounter = 0;
    this.targetJumpHeight = 0;
    this.jumpHeight = this.getJumpHeight();
    this.smallerJumpHeight = this.getSmallerJumpHeight();
  }

  getJumpHeight(){
    return Math.floor(game.gameArea.getBoundingClientRect().height / 10) * 5;
    //First jump is half the height of the game area
    //We need a multiple of 5 as the fall decrement is 5
  }

  getSmallerJumpHeight(){
    return Math.floor(this.jumpHeight / 100)*50;
    //The second consecutive jump is half the initial jump
    //looking for a multiple of 5 here too
  }

  getPlayerPositionX(){
    const startingPosition =
    this.element.getBoundingClientRect().left -
    this.element.getBoundingClientRect().width / 2;
    this.element.style.left = startingPosition + "px";
    return startingPosition;
  }

  initiateJump() {
    if (this.jumpCounter === 0) {
      this.targetJumpHeight += this.jumpHeight;
      //this.position[0]; 
    } else if (this.jumpCounter === 1) {
      this.targetJumpHeight += this.smallerJumpHeight;

      //this.position[0] 
    }
    this.jumpCounter++;
  }

  earnPoints(pointIncrement) {
    return this.score += pointIncrement;
  }

  getHurt(lifeDecrement) {
    return this.lives -= lifeDecrement;
  }
}

