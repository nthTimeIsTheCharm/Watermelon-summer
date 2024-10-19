class InanimateEntity extends GameEntity {
  static parentElement = document.getElementById("game-area");

  constructor(speed, direction, type) {
    super(speed, direction);
    this.type = type;
    
    //Create and append the element
    this.element = document.createElement("div");
    this.element.classList.add(type);
    this.element.style.position = "absolute";
    InanimateEntity.parentElement.appendChild(this.element);
  }
}

