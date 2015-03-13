(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Board = Tetris.Board = function () {
    this.grid = this.createGrid();
    this.restingGrid = this.createGrid();
    this.generateTetromino();
  };

  Board.prototype.createGrid = function () {
    var grid = [];
    for (var i = 0; i <= 20; i++) {
      grid[i] = [];
      for (var j = 0; j <= 10; j++) {
        grid[i].push(0);
      }
    }

    return grid;
  };

  Board.prototype.get = function (grid, x, y) {
    return grid[y][x]
  };

  Board.prototype.set = function (grid, x, y, val) {
    grid[y][x] = val;
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
    var tet = this.activeTetromino;
    var that = this;
    tet.layouts[tet.rotation].forEach(function (pos) {
      if (pos[0] > 18) {
        that.addToRestingGrid(that.activeTetromino);
        that.generateTetromino();
        return
      }
    })
    this.activeTetromino.descend();
    this.updateGrid();
  };

  Board.prototype.addToRestingGrid = function (tetromino) {
    var that = this;
    tetromino.currentLayout().forEach( function (pos) {
      that.set(that.restingGrid, pos[1], pos[0], tetromino.shapeName)
    })
  };

  Board.prototype.rotate = function () {
    this.activeTetromino.rotate();
  };

  Board.prototype.clearGrid = function () {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if (this.restingGrid[i][j] === 0) {
          this.grid[i][j] = 0;
        }
      }
    }
  };

  Board.prototype.updateGrid = function () {
    this.clearGrid();
    var layout = this.activeTetromino.currentLayout();
    var shape = this.activeTetromino.shapeName
    var that = this;
    layout.forEach( function (pos) {
      that.set(that.grid, pos[1], pos[0], shape)
    })
  }
})();
