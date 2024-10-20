class Fireball extends InanimateEntity {
  static fireballsArray = [];
  static gameAreaHeight = Math.trunc(
    InanimateEntity.parentElement.getBoundingClientRect().height
  );

  constructor(speed, direction, type) {
    super(speed, direction, type);

    //Element placed all the way to the right in the CSS
    this.element.style.top = this.getRandomYPosition();
    this.position.push(null); //No need for a value for the x-axis
    this.position.push(
      Math.trunc(
        InanimateEntity.parentElement.getBoundingClientRect().right -
          InanimateEntity.parentElement.getBoundingClientRect().left -
          this.element.getBoundingClientRect().width
      )
    );
    Fireball.fireballsArray.push(this);
  }

  getRandomYPosition() {
    const elementHeight = this.element.getBoundingClientRect().height;
    const randomYPosition = Math.floor(
      Math.random() * (Fireball.gameAreaHeight - elementHeight)
    );
    return `${randomYPosition}px`;
  }
}
