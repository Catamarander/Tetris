(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Board = Tetris.Board = function () {
    this.grid = [];
    this.populateGrid();
    this.generateTetromino();
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

  Board.prototype.toRight = function () {
    this.activeTetromino.move("right")
  };

  Board.prototype.toLeft = function () {
    this.activeTetromino.move("left")
  };

  Board.prototype.descend = function () {
    this.activeTetromino.descend();
    this.updateGrid();
  };

  Board.prototype.rotate = function () {
    this.activeTetromino.rotate();
  };

  Board.prototype.updateGrid = function () {
    var layout = this.activeTetromino.current();
    var shape = this.activeTetromino.shapeName
    var that = this;
    layout.forEach( function (pos) {
      that.set(pos[0], pos[1], shape)
    })
  }
})();
