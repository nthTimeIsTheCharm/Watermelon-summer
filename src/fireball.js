class Fireball extends InanimateEntity {
  static frequency = 200;
  static fireballsArray = [];

  static getNewFrameNumber() {
    const newFrameNumber = Math.ceil(Math.random() * Fireball.frequency);
    return newFrameNumber;
  }

  constructor(speed, direction, position, type) {
    super(speed, direction, position, type);
    this.speed = 1;
    this.direction = "left";
    this.type = "fireball";
    this.lifeDecrement = 1;
    this.element = paintOnScreen(this.type);

    //Element placed all the way to the right in the CSS
    placeInGameArea(this.element, "y-axis", this.getRandomYPosition());

    //No need for a value for the y-axis
    this.position.push(null, this.getXPosition());

    Fireball.fireballsArray.push(this);
  }

  getXPosition() {
    return Math.trunc(
      InanimateEntity.parentElement.getBoundingClientRect().right -
        InanimateEntity.parentElement.getBoundingClientRect().left -
        this.element.getBoundingClientRect().width
    );
  }

  getRandomYPosition() {
    const elementHeight = this.element.getBoundingClientRect().height;
    const randomYPosition = Math.floor(
      Math.random() * (game.gameAreaHeight - elementHeight)
    );
    return `${randomYPosition}`;
  }
}
