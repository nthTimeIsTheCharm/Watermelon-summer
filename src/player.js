class Player extends GameEntity {
  constructor(speed, direction) {
    super(speed, direction);
    this.score = 0;
    this.lives = 5;
    this.jumpHeight = 10;
    this.element = document.getElementById("player");
    this.position.push(0, this.element.getBoundingClientRect().left);
  }

  jump(){

  }

  earnPoints(pointIncrement){
    this.score += pointIncrement;
  }
  
  getHurt(lifeDecrement){
    this.lives += lifeDecrement; 
  }
}

