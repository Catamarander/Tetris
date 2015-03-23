(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var View = Tetris.View = function (board) {
    this.board = board;
    this.queue = this.board.queue;
    this.createUpNext();
    this.createView();
  };

  View.prototype.createView = function () {
    for (var i = 2; i < 22; i++) {
      var $row = $('<div>');
      $row.attr({
        class: "tetris-row",
        y: i
      })
      for (var j = 0; j < 10; j++) {
        var $cell = $('<div>');
        $cell.attr({
          x: j,
          class: "tetris-cell"
        })

        $row.append($cell)
      }

      $('.board').append($row)
    }
  };

  View.prototype.createUpNext = function () {
    for (var i = 0; i < 17; i++) {
      var $row = $('<div>');
      $row.attr({
        class: "up-next-row",
        y: i
      })

      for (var j = 0; j < 6; j++) {
        var $cell = $('<div>');
        $cell.attr({
          x: j,
          class: "up-next-cell"
        })

        $row.append($cell)
      }

      $('.up-next').append($row)
    }
  }

  View.prototype.setCell = function (el, x, y, shapeClass) {
    var $cell = $(el).find("[y=" + y + "]").find("[x=" + x + "]")
    $cell.addClass(shapeClass)
  };

  View.prototype.unSetCell = function (el, x, y, className) {
    var $cell = $(el).find("[y=" + y + "]").find("[x=" + x + "]")
    $cell.attr({class: className})
  };

  View.prototype.render = function () {
    for (var i = 0; i < this.board.grid.length; i++) {
      for (var j = 0; j < this.board.grid[i].length; j++) {
        if (this.board.grid[i][j] != 0) {
          this.setCell('.board', j, i, this.board.grid[i][j])
        } else {
          this.unSetCell('.board', j, i, 'tetris-cell')
        }
      }
    }
  };

  View.prototype.clearUpNext = function () {
    for (var i = 0; i < 16; i++) {
      for (var j = 0; j < 7; j++) {
        this.unSetCell('.up-next', j, i, 'up-next-cell')
      }
    }
  };

  View.prototype.renderUpNext = function () {
    this.clearUpNext();
    var that = this;
    for (var i = 0; i < 4; i++) {
      var shape = this.queue.upNext[i];
      var shapeName = shape.shapeName;
      shape.layouts[0].forEach(function (arr) {
        var buffer = 1;
        if (shapeName === "i") {
          buffer = 2;
        }
        that.setCell('.up-next', arr[1] - 2, (arr[0] + (4 * i + buffer)), shapeName )
      })
    }
  }
})();

// arr[0] + 2, (arr[1] + ((4 * i + 1))) - 3
