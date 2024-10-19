class GameEntity {
  constructor(speed, direction) {
    this.speed = speed;
    this.direction = direction;
    this.position = 0;
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
  };

  //Vertical movement
  checkTopBoundary() {}
  checkBottomBoundary() {
    const gameAreaBottom = game.gameArea.getBoundingClientRect().bottom;
    const entityBottom = this.element.getBoundingClientRect().bottom; 

    if(gameAreaBottom > (entityBottom + this.speed)){
        return true;
    }else{
        return false;
    }
  }

  moveUp(speed) {
    
  }

  moveDown(speed) {
    let positionTop = rose.element.style.top; //no idea what I need this line....
    const withinBoundary = this.checkBottomBoundary();
    if (withinBoundary) {
      this.position += this.speed;
      return `${this.position}px`;
    } else {
      this.disappear();
    }
  }


  //Horizontal movement
  checkLeftBoundary() {
    console.log("hi!!");
    const gameAreaLeft = game.gameArea.getBoundingClientRect().left;
    const entityLeft = this.element.getBoundingClientRect().left;

    if (gameAreaLeft > entityLeft + this.speed) {
      return true;
    } else {
      return false;
    }
  }
  checkRightBoundary() {}

  moveLeft(speed) {
    const withinBoundary = this.checkLeftBoundary();
    if (withinBoundary) {
      this.position += this.speed;
      return `${this.position}px`;
    } else {
      console.log("byeee");
      this.disappear();
    }
  }

  moveRight(speed) {
    const positionLeft = Math.trunc(this.element.getBoundingClientRect().left);
    const withinBoundary = this.checkRightBoundary();
  }
}