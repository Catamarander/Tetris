(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.board = new Tetris.Board();
    this.view = new Tetris.View();
    this.currentTetromino = this.board.activeTetromino;

    var that = this;
    this.currentTetromino.layouts[this.currentTetromino.rotation].forEach( function (pos) {

      that.view.setCell(pos[1], pos[0], that.currentTetromino.shapeName)
    })
    console.log(this.currentTetromino.shapeName)
    console.log(this.currentTetromino.rotation)
    console.log(this.currentTetromino.layouts[this.currentTetromino.rotation])
  };
})();
