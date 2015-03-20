(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var View = Tetris.View = function (board) {
    this.board = board;
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

  View.prototype.setCell = function (x, y, shapeClass) {
    var $cell = $('.board').find("[y=" + y + "]").find("[x=" + x + "]")
    $cell.addClass(shapeClass)
  };

  View.prototype.unSetCell = function (x, y) {
    var $cell = $('.board').find("[y=" + y + "]").find("[x=" + x + "]")
    $cell.attr({class: 'tetris-cell'})
  };

  View.prototype.render = function () {
    for (var i = 0; i < this.board.grid.length; i++) {
      for (var j = 0; j < this.board.grid[i].length; j++) {
        if (this.board.grid[i][j] != 0) {
          this.setCell(j, i, this.board.grid[i][j])
        } else {
          this.unSetCell(j, i)
        }
      }
    }
  }
})();
