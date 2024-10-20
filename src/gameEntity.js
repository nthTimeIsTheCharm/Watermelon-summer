class GameEntity {
  constructor(speed, direction) {
    this.speed = speed;
    this.direction = direction;
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

    if (gameAreaRight > entityRight + this.speed) {
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
