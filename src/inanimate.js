class InanimateEntity extends GameEntity {
  static parentElement = document.getElementById("game-area");

  constructor(speed, direction, position, type) {
    super(speed, direction, position);
    this.type = null;
  }

  disappear() {
    if (this.type === "watermelon") {
      this.element.remove();
      const index = Watermelon.gelatiArray.indexOf(this);
      Watermelon.gelatiArray.splice(index, 1);
    } else if (this.type === "fireball") {
      this.element.remove();
      const index = Fireball.fireballsArray.indexOf(this);
      Fireball.fireballsArray.splice(index, 1);
    }
  }
}
