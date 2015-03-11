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
        0: [[0, 1], [1, 1], [2, 1], [2, 2]],
        1: [[1, 0], [1, 1], [1, 2], [2, 0]],
        2: [[0, 0], [0, 1], [1, 1], [2, 1]],
        3: [[0, 2], [1, 0], [1, 1], [1, 2]]
      },

      "j" : {
        0: [[0, 1], [1, 1], [2, 0], [2, 1]],
        1: [[0, 0], [1, 0], [1, 1], [1, 2]],
        2: [[0, 1], [0, 2], [1, 1], [2, 1]],
        3: [[1, 0], [1, 1], [1, 2], [2, 2]]
      },

      "z" : {
        0: [[1, 0], [1, 1], [2, 1], [2, 2]],
        1: [[0, 1], [1, 0], [1, 1], [2, 0]],
        2: [[0, 0], [0, 1], [1, 1], [1, 2]],
        3: [[0, 2], [1, 1], [1, 2], [2, 1]]
      },

      "s" : {
        0: [[1, 1], [1, 2], [2, 0], [2, 1]],
        1: [[0, 0], [1, 0], [1, 1], [2, 1]],
        2: [[0, 1], [0, 2], [1, 0], [1, 1]],
        3: [[0, 1], [1, 1], [1, 2], [2, 2]]
      },

      "o" : {
        0: [[0, 0], [0, 1], [1, 0], [1, 1]],
        1: [[0, 0], [0, 1], [1, 0], [1, 1]],
        2: [[0, 0], [0, 1], [1, 0], [1, 1]],
        3: [[0, 0], [0, 1], [1, 0], [1, 1]]
      },

      "i" : {
        0: [[0, 1], [1, 1], [2, 1], [3, 1]],
        1: [[1, 0], [1, 1], [1, 2], [1, 3]],
        2: [[0, 2], [1, 2], [2, 2], [3, 2]],
        3: [[2, 0], [2, 1], [2, 2], [2, 3]]
      },

      "t" : {
        0: [[1, 0], [1, 1], [1, 2], [2, 1]],
        1: [[0, 1], [1, 0], [1, 1], [2, 1]],
        2: [[0, 1], [1, 0], [1, 1], [1, 2]],
        3: [[0, 1], [1, 1], [1, 2], [2, 1]]
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
  };
})()
