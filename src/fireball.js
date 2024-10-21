class Fireball extends InanimateEntity {
  static fireballsArray = [];
  static gameAreaHeight = Math.trunc(
    InanimateEntity.parentElement.getBoundingClientRect().height
  );

  constructor(speed, direction,position, type) {
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
      Math.random() * (Fireball.gameAreaHeight - elementHeight)
    );
    return `${randomYPosition}`;
  }
}
