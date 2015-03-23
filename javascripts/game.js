(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.board = new Tetris.Board();
    this.view = new Tetris.View(this.board);
    this.currentTetromino = this.board.activeTetromino;
  };

  Game.prototype.play = function () {
    var that = this;
    var falling = setInterval(that.board.descend.bind(that.board), 160)
    var update = setInterval(that.board.updateGrid.bind(that.board), 50)
    var render = setInterval(that.view.render.bind(that.view), 100)
    var renderUpNext = setInterval(that.view.renderUpNext.bind(that.view), 500)
    var scoring = setInterval(that.view.renderScore.bind(that.view), 500)
    var gamePlay = setInterval(function () {
      if (that.board.isEnded) {
        clearInterval(falling);
        clearInterval(update);
        clearInterval(render);
        clearInterval(gamePlay);
        clearInterval(scoring);
        console.log("Good job! Your score was: " + that.board.score)
      }
    }, 50)
  };

  Game.prototype.renderTetromino = function () {
    var that = this;
    this.currentTetromino.layouts[this.currentTetromino.rotation].forEach( function (pos) {
      that.view.setCell(pos[1], pos[0], that.currentTetromino.shapeName)
    })
  };
})();
