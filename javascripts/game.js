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
    setInterval(that.board.descend.bind(that.board), 160)
    setInterval(that.board.updateGrid(), 50)
    setInterval(that.view.render(), 100)
  }

  Game.prototype.descendTetromino = function () {
    this.currentTetromino.descend();
    this.renderTetromino();

    var tet = this.currentTetromino;
    var that = this;
    tet.layouts[tet.rotation].forEach(function (pos) {
      if (pos[0] > 18) {
        that.board.generateTetromino();
        that.currentTetromino = that.board.activeTetromino
        return
      }

    })
  };

  Game.prototype.renderTetromino = function () {
    var that = this;
    this.currentTetromino.layouts[this.currentTetromino.rotation].forEach( function (pos) {
      that.view.setCell(pos[1], pos[0], that.currentTetromino.shapeName)
    })
  };
})();
