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

    this.jumpSpeed = 5; //or 10..
    this.jumpCounter = 0;
    this.targetJumpHeight = 0;
    this.jumpHeight = this.getJumpHeight();
    this.smallerJumpHeight = this.getSmallerJumpHeight();
  }

  getJumpHeight(){
    return Math.floor(game.gameArea.getBoundingClientRect().height / 10) * 5; //so that it's a multiple of 5 as the fall decrement is 5
  }

  getSmallerJumpHeight(){
    return Math.floor(this.jumpHeight / 100)*50;
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

