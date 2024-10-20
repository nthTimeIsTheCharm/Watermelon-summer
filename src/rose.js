class Rose extends InanimateEntity {
  static rosesArray = [];
  static gameAreaHeight = Math.trunc(
    InanimateEntity.parentElement.getBoundingClientRect().width
  );

  constructor(speed, direction, type) {
    super(speed, direction, type);

    //Element placed all the way to the top in the CSS
    this.element.style.left = this.getRandomXPosition();
    this.position.push(0, null);
    Rose.rosesArray.push(this);
  }

  getRandomXPosition() {
    const elementWidth = this.element.getBoundingClientRect().width;
    const randomXPosition = Math.floor(
      Math.random() * (Rose.gameAreaHeight - elementWidth)
    );
    return `${randomXPosition}px`;
  }
}

