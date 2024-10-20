class Player extends GameEntity {
  constructor(speed, direction) {
    super(speed, direction);
    this.score = 0;
    this.lives = 5;
    this.element = document.getElementById("player");
    this.positionX = 0;
    this.positionY = 0;
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

