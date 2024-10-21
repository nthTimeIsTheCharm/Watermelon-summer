class Player extends GameEntity {
  constructor(speed, direction, position) {
    super(speed, direction, position);
    this.speed = 10;
    this.direction = null;
    this.element = document.getElementById("player");
    this.position.push(0, this.getPlayerPositionX());
    
    this.score = 0;
    this.lives = 5;
    this.jumpCounter = 0;
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
    return this.element.getBoundingClientRect().left -
    this.element.getBoundingClientRect().width / 2;
  }

  jump() {
    if (this.jumpCounter === 0) {
      this.position[0] += this.jumpHeight;
    } else if (this.jumpCounter === 1) {
      const smallerJump = Math.floor(this.jumpHeight / 100)*50;
      this.position[0] += smallerJump;
    }
    this.jumpCounter++;
    return `${this.position[0]}`;
  }

  earnPoints(pointIncrement) {
    return this.score += pointIncrement;
  }

  getHurt(lifeDecrement) {
    return this.lives -= lifeDecrement;
  }
}

