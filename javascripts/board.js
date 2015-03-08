(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Board = Tetris.Board = function () {
    this.grid = [];
    this.populateGrid();
  };

  Board.prototype.populateGrid = function () {
    for (var i = 0; i <= 20; i++) {
      this.grid[i] = [];
      for (var j = 0; j <= 10; j++) {
        this.grid[i].push(0);
      }
    }
  };

  Board.prototype.get = function (x, y) {
    return this.grid[y][x]
  };

  Board.prototype.set = function (x, y, val) {
    this.grid[y][x] = val;
  };

  Board.prototype.generateTetromino = function () {
    this.activeTetromino = new Tetris.Tetromino();
  };
})();
