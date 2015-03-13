(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Tetromino = Tetris.Tetromino = function () {
    this.shape = this.randomShape();
    this.layouts = this.shape[0];
    this.shapeName = this.shape[1];
    this.rotation = 0;
  }

  Tetromino.prototype.randomShape = function () {
    TETROMINOS = {
      "l" : {
        0: [[0, 4], [1, 4], [2, 4], [2, 5]],
        1: [[0, 3], [0, 4], [0, 5], [1, 3]],
        2: [[0, 4], [0, 5], [1, 5], [2, 5]],
        3: [[0, 6], [1, 4], [1, 5], [1, 6]]
      },

      "j" : {
        0: [[0, 5], [1, 5], [2, 4], [2, 5]],
        1: [[0, 4], [1, 4], [1, 5], [1, 6]],
        2: [[0, 4], [0, 5], [1, 4], [2, 4]],
        3: [[1, 3], [1, 4], [1, 5], [2, 5]]
      },

      "z" : {
        0: [[0, 3], [0, 4], [1, 4], [1, 5]],
        1: [[0, 5], [1, 4], [1, 5], [2, 4]],
        2: [[0, 4], [0, 5], [1, 5], [1, 6]],
        3: [[0, 5], [1, 4], [1, 5], [2, 4]]
      },

      "s" : {
        0: [[0, 5], [0, 6], [1, 4], [1, 5]],
        1: [[0, 4], [1, 4], [1, 5], [2, 5]],
        2: [[0, 4], [0, 5], [1, 3], [1, 4]],
        3: [[0, 4], [1, 4], [1, 5], [2, 5]]
      },

      "o" : {
        0: [[0, 4], [0, 5], [1, 4], [1, 5]],
        1: [[0, 4], [0, 5], [1, 4], [1, 5]],
        2: [[0, 4], [0, 5], [1, 4], [1, 5]],
        3: [[0, 4], [0, 5], [1, 4], [1, 5]]
      },

      "i" : {
        0: [[0, 5], [1, 5], [2, 5], [3, 5]],
        1: [[0, 3], [0, 4], [0, 5], [0, 6]],
        2: [[0, 4], [1, 4], [2, 4], [3, 4]],
        3: [[1, 3], [1, 4], [1, 5], [1, 6]]
      },

      "t" : {
        0: [[0, 3], [0, 4], [0, 5], [1, 4]],
        1: [[0, 5], [1, 4], [1, 5], [2, 5]],
        2: [[0, 4], [1, 3], [1, 4], [1, 5]],
        3: [[0, 4], [1, 4], [1, 5], [2, 4]]
      }
    };

    var possibleShapes = ["i", "j", "l", "o", "s", "t", "z"];
    var idx = Math.floor(Math.random() * possibleShapes.length);
    var newShape = possibleShapes[idx];

    return [TETROMINOS[newShape], newShape];
  };

  Tetromino.prototype.descend = function () {
    var that = this;
    for (rotation in this.layouts) {
      that.layouts[rotation].forEach( function (pos, index) {
        that.layouts[rotation][index] = [pos[0] + 1, pos[1]];
      })
    }
  };

  Tetromino.prototype.rotate = function () {
    this.rotation += 1;
    this.rotation = this.rotation % 4;
    return this.shape[this.rotation]
  };

  Tetromino.prototype.move = function (dir) {
    var that = this;

    for (rotation in this.layouts) {
      this.layouts[rotation].forEach( function (pos, index) {
        if (dir === "left") {
          that.layouts[rotation][index] = [pos[0], pos[1] - 1]
        } else if (dir === "right") {
          that.layouts[rotation][index] = [pos[0], pos[1] + 1]
        }
      })
    }

    for (pos in this.layouts[this.rotation]) {
      var coord = this.layouts[this.rotation][pos];
      if (coord[1] < 0) {
        this.move("right")
      } else if (coord[1] > 9) {
        this.move("left")
      }
    }
  };

  Tetromino.prototype.current = function () {
    return this.layouts[this.rotation]
  }
})()
