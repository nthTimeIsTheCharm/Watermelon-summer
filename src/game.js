class Game{
    constructor() {
        this.gameArea = document.getElementById("game-area");
        this.gameAreaWidth = this.gameArea.getBoundingClientRect().width;
        this.gameAreaHeight = this.gameArea.getBoundingClientRect().height;
    }

    gameover(){
      this.gameArea.classList.add("game-over");
      const gameOverMessage = document.createElement("p");
      gameOverMessage.setAttribute("id", "game-over");
      gameOverMessage.textContent = "Game over!";
      //Remove all the elements of the game area
      this.gameArea.replaceChildren(gameOverMessage);
    }
}
