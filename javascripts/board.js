(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Board = Tetris.Board = function () {
    this.grid = this.createGrid();
    this.landedGrid = this.createGrid();
    this.generateTetromino();
  };

  Board.prototype.createGrid = function () {
    var grid = [];
    for (var i = 0; i < 20; i++) {
      grid[i] = [];
      for (var j = 0; j < 10; j++) {
        grid[i].push(0);
      }
    }

    return grid;
  };

  Board.prototype.get = function (grid, x, y) {
    return grid[y][x]
  };

  Board.prototype.set = function (grid, x, y, val) {
    if (typeof grid[y] === "undefined" ) {
      debugger
    }
    grid[y][x] = val;
  };

  Board.prototype.generateTetromino = function () {
    this.activeTetromino = new Tetris.Tetromino();
  };

  Board.prototype.toRight = function () {
    if (!this.checkCollisions("move", "right")) {
      this.activeTetromino.move("right")
    }
  };

  Board.prototype.toLeft = function () {
    if (!this.checkCollisions("move", "left")) {
      this.activeTetromino.move("left")
    }
  };

  Board.prototype.descend = function () {
    if (this.checkCollisions("descend")) {
      this.addToLandedGrid(this.activeTetromino);
      this.generateTetromino();
      return
    }

    var tet = this.activeTetromino;
    var that = this;
    var stillFalling = true;

    tet.layouts[tet.rotation].forEach(function (pos) {
      if (pos[0] > 18) {
        that.addToLandedGrid(that.activeTetromino);
        that.generateTetromino();
        stillFalling = false;
        return
      }
    })

    if (stillFalling) {
      this.activeTetromino.descend();
      this.updateGrid();
    }
  };

  Board.prototype.addToLandedGrid = function (tetromino) {
    var that = this;
    tetromino.currentLayout().forEach( function (pos) {
      that.set(that.landedGrid, pos[1], pos[0], tetromino.shapeName)
    })
    this.checkLine();
  };

  Board.prototype.rotate = function () {
    if (!this.checkCollisions("rotate")) {
      this.activeTetromino.rotate();
    }
  };

  Board.prototype.clearGrid = function () {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if (this.landedGrid[i][j] === 0) {
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
  };

  Board.prototype.checkCollisions = function (callback, options) {
    var possibleTet = new Tetris.Tetromino({
      shape: this.activeTetromino.shape,
      rotation: this.activeTetromino.rotation,
      layouts: this.activeTetromino.layouts
    })

    possibleTet[callback](options);

    var board = this;
    var occupied = false;

    possibleTet.currentLayout().forEach(function (pos) {
      if (pos[0] == 20 || board.landedGrid[pos[0]][pos[1]] != 0) {
        occupied = true;
        return
      }
    })

    if (occupied) { return true }
    return false
  };

  Board.prototype.checkLine = function () {
    var completeLine = true;
    var that = this;

    this.landedGrid.forEach( function (row, row_index) {
      completeLine = true;
      row.forEach( function (cell) {
        if (cell == 0) {
          completeLine = false;
        }
      })
      if (completeLine) {
        that.deleteLine(row_index);
        return
      }
    })
  };

  Board.prototype.deleteLine = function (y_index) {
    var board = this;
    this.grid[y_index].forEach( function (x, x_index) {
      board.set(board.grid, x_index, y_index, 0)
      board.set(board.landedGrid, x_index, y_index, 0)
    })
  };

  Board.prototype.printGrid = function () {
    this.grid.forEach( function (row) {
      console.log("\n" + row)
    })
  };

  Board.prototype.printLanded = function () {
    this.landedGrid.forEach( function (row) {
      console.log("\n" + row)
    })
  };
})();
