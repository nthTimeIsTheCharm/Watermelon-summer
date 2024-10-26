class Rose extends InanimateEntity {
  static rosesArray = [];
  static gameAreaHeight = Math.trunc(
    InanimateEntity.parentElement.getBoundingClientRect().width
  );

  constructor(speed, direction, position, type) {
    super(speed, direction, position, type);
    this.speed = 1;
    this.direction = "down";
    this.type = "rose";
    this.pointIncrement = 5;
    this.element = paintOnScreen(this.type);
    
    //Element placed all the way to the top in the CSS
    this.position.push(0);

    //The value for the x-axis stays constant but is used to paint the points upon collision
    this.position.push(this.getRandomXPosition());
    
    Rose.rosesArray.push(this);

    placeInGameArea(this.element, "x-axis", this.position[1]);
  }

  getRandomXPosition() {
    const elementWidth = this.element.getBoundingClientRect().width;
    const randomXPosition = Math.floor(
      Math.random() * (game.gameAreaHeight - elementWidth)
    );
    return randomXPosition;
  }
}
