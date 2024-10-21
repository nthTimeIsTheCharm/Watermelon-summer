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
    this.element = paintOnScreen(this.type);

    //Element placed all the way to the top in the CSS
    placeInGameArea(this.element, "x-axis", this.getRandomXPosition());
    
    //No need for a value for the x-axis
    this.position.push(0, null);

    Rose.rosesArray.push(this);
  }

  getRandomXPosition() {
    const elementWidth = this.element.getBoundingClientRect().width;
    const randomXPosition = Math.floor(
      Math.random() * (Rose.gameAreaHeight - elementWidth)
    );
    return `${randomXPosition}`;
  }
}
