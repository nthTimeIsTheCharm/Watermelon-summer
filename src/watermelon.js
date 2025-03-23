class Watermelon extends InanimateEntity {
  static frequency = 300;
  static gelatiArray = [];
  static pointsEarnedDivs = [];

  static getNewFrameNumber() {
    const newFrameNumber = Math.ceil(Math.random() * Watermelon.frequency);
    return newFrameNumber;
  }

  constructor(speed, direction, position, type) {
    super(speed, direction, position, type);
    this.speed = 1;
    this.direction = "down";
    this.type = "watermelon";
    this.pointIncrement = 5;
    this.element = paintOnScreen(this.type);

    //Element placed all the way to the top in the CSS
    this.position.push(0);

    //The value for the x-axis stays constant but is used to paint the points upon collision
    this.position.push(this.getRandomXPosition());

    Watermelon.gelatiArray.push(this);

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
