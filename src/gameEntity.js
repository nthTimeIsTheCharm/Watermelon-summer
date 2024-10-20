class GameEntity {
  constructor(speed, direction) {
    this.speed = speed;
    this.direction = direction;
  }

  move(speed, direction) {
    switch (direction) {
      case "up":
        return this.moveUp(speed);
      case "down":
        return this.moveDown(speed);
      case "left":
        return this.moveLeft(speed);
      case "right":
        return this.moveRight(speed);
    }
  }

  //Vertical movement
  checkTopBoundary() {}
  checkBottomBoundary() {
    const gameAreaBottom = game.gameArea.getBoundingClientRect().bottom;
    const entityBottom = this.element.getBoundingClientRect().bottom;

    if (gameAreaBottom > entityBottom + this.speed) {
      return true;
    } else {
      return false;
    }
  }

  moveUp(speed) {}

  moveDown(speed) {
    const withinBoundary = this.checkBottomBoundary();
    if (withinBoundary) {
      this.pointInMovementAxis += this.speed;
      return `${this.pointInMovementAxis}px`;
    } else if (this instanceof InanimateEntity) {
      this.disappear();
    }
  }

  //Horizontal movement
  checkLeftBoundary() {
    const gameAreaLeft = game.gameArea.getBoundingClientRect().left;
    const entityLeft = this.element.getBoundingClientRect().left;

    if (gameAreaLeft < entityLeft + this.speed) {
      return true;
    } else {
      return false;
    }
  }

  checkRightBoundary() {}

  moveLeft(speed) {
    const withinBoundary = this.checkLeftBoundary();
    if (withinBoundary) {
      this.pointInMovementAxis += this.speed;
      return `${this.pointInMovementAxis}px`;
    } else if (this instanceof InanimateEntity) {
      this.disappear();
    }
  }

  moveRight(speed) {
    const pointInMovementAxisLeft = Math.trunc(
      this.element.getBoundingClientRect().left
    );
    const withinBoundary = this.checkRightBoundary();
  }
}
