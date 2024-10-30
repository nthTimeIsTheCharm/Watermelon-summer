class GameEntity {
  constructor(speed, direction, position) {
    this.speed = 0;
    this.direction = null;
    this.position = [];
  }

  move(direction) {
    switch (direction) {
      case "up":
        return this.moveUp();
      case "down":
        return this.moveDown();
      case "left":
        return this.moveLeft();
      case "right":
        return this.moveRight();
    }
  }

  //Vertical movement
  checkBottomBoundary() {
    const gameAreaBottom = game.gameArea.getBoundingClientRect().bottom;
    const entityBottom = this.element.getBoundingClientRect().bottom;

    if (gameAreaBottom > entityBottom + this.speed) {
      return true;
    } else {
      return false;
    }
  }

  moveUp() {
      //Not checking the top boundary
      //the player's jump height is calculated based to the game area width
      this.position[0] += this.jumpSpeed;
      return `${this.position[0]}`;
   
  }

  moveDown() {
    const withinBoundary = this.checkBottomBoundary();
    if (withinBoundary) {
      this.position[0] += this.speed;
      return `${this.position[0]}`;
    } else if (this instanceof InanimateEntity) {
      this.disappear();
    }
  }

  //Horizontal movement
  checkLeftBoundary() {
    const gameAreaLeft = game.gameArea.getBoundingClientRect().left;
    const entityLeft = this.element.getBoundingClientRect().left;

    if (gameAreaLeft < entityLeft - this.speed) {
      return true;
    } else {
      return false;
    }
  }

  checkRightBoundary() {
    const gameAreaRight = game.gameArea.getBoundingClientRect().right;
    const entityRight = this.element.getBoundingClientRect().right;

    if (gameAreaRight > entityRight + this.speed /** + 43**/) {
      return true;
    } else {
      return false;
    }
  }

  moveLeft() {
    const withinBoundary = this.checkLeftBoundary();
    if (withinBoundary) {
          this.position[1] -= this.speed;
      return `${this.position[1]}`;
    } else if (this instanceof InanimateEntity) {
      this.disappear();
    }
  }

  moveRight() {
    const withinBoundary = this.checkRightBoundary();
    if (withinBoundary) {
      this.position[1] += this.speed;
      return `${this.position[1]}`;
    } else if (this instanceof InanimateEntity) {
      this.disappear();
    }
  }
}
