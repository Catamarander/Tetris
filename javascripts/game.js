(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.board = new Tetris.Board();
    this.view = new Tetris.View();
    this.currentTetromino = this.board.activeTetromino;
    this.renderTetromino();

    var that = this;
    setInterval(that.descendTetromino.bind(that), 1000)
  };

  Game.prototype.descendTetromino = function () {
    this.unRenderTetromino();
    this.currentTetromino.descend();
    this.renderTetromino();
  };

  Game.prototype.renderTetromino = function () {
    var that = this;
    this.currentTetromino.layouts[this.currentTetromino.rotation].forEach( function (pos) {
      that.view.setCell(pos[1], pos[0], that.currentTetromino.shapeName)
    })
  };

  Game.prototype.unRenderTetromino = function () {
    var that = this;
    this.currentTetromino.layouts[this.currentTetromino.rotation].forEach (function (pos) {
      that.view.unSetCell(pos[1], pos[0], that.currentTetromino.shapeName)
    })
  }
})();
