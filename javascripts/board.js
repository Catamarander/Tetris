(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Board = Tetris.Board = function () {
    this.isEnded = false;
    this.grid = this.createGrid();
    this.landedGrid = this.createGrid();
    this.generateTetromino();
  };

  Board.prototype.createGrid = function () {
    var grid = [];
    for (var i = 0; i < 22; i++) {
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
    if (this.checkCollisions("descend")) {
      this.end();
    }
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

  Board.prototype.superDescend = function(callback) {
    while (!this.checkCollisions("descend")) {
      this.descend();
    }
  };

  Board.prototype.playing = function () {
    var playing = true;
    this.landedGrid[0].forEach( function (cell) {
      debugger
      if (cell != 0) {
        playing = false;
      }
    })
    return playing;
  };

  Board.prototype.descend = function () {
    if (this.checkCollisions("descend")) {
      this.addToLandedGrid(this.activeTetromino);
      this.generateTetromino();
      return
    }

    var tet = this.activeTetromino,
      that = this,
      stillFalling = true;

    tet.layouts[tet.rotation].forEach(function (pos) {
      if (pos[0] > 20) {
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
    var layout = this.activeTetromino.currentLayout(),
      shape = this.activeTetromino.shapeName,
      that = this;

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

    var board = this,
      occupied = false;

    possibleTet.currentLayout().forEach(function (pos) {
      // if (pos[0] != 22 && typeof board.landedGrid[pos[0]] == "undefined") {
      //   debugger
      // }
      if (pos[0] >= 22 || board.landedGrid[pos[0]][pos[1]] != 0) {
        occupied = true;
        return
      }
    })

    if (occupied) { return true }
    return false
  };

  Board.prototype.checkLine = function () {
    var completeLine = true
      that = this,
      landed = this.landedGrid;

    for (var i = landed.length - 1; i > 1; i--) {
      completeLine = true;
      landed[i].forEach ( function (cell) {
        if (cell == 0) {
          completeLine = false
        }
      })
      if (completeLine) {
        that.shiftRowsDown(i)
        i++;
      }
    }
  };

  Board.prototype.deleteLine = function (y_index) {
    var board = this;
    this.grid[y_index].forEach( function (x, x_index) {
      board.set(board.grid, x_index, y_index, 0)
      board.set(board.landedGrid, x_index, y_index, 0)
    })
  };

  Board.prototype.shiftRowsDown = function (y_index) {
    this.grid.splice(y_index, 1);
    this.landedGrid.splice(y_index, 1);
    this.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.landedGrid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  Board.prototype.end = function () {
    this.isEnded = true;
  };

  Board.prototype.isEnded = function () {
    return this.isEnded;
  }

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
