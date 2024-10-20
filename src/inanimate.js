class InanimateEntity extends GameEntity {
  static parentElement = document.getElementById("game-area");

  constructor(speed, direction, type) {
    super(speed, direction);
    this.type = type;
    this.pointInMovementAxis = 0;
    
    //Create and append the element
    this.element = document.createElement("div");
    this.element.classList.add(type);
    this.element.style.position = "absolute";
    InanimateEntity.parentElement.appendChild(this.element);
  }

  disappear(){
    if (this.type === "rose") {
      this.element.remove();
      const index = Rose.rosesArray.indexOf(this);
      Rose.rosesArray.splice(index, 1);
    } else if (this.type === "fireball") {
      this.element.remove();
      const index = Fireball.fireballsArray.indexOf(this);
      Fireball.fireballsArray.splice(index, 1);
    }
  }
}

