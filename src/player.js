class Player extends GameEntity {
  constructor(speed, direction) {
    super(speed, direction);
    this.score = 0;
    this.lives = 5;
    this.element = document.getElementById("player");
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

