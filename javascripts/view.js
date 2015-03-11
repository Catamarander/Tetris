(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var View = Tetris.View = function () {
    this.createView();
  };

  View.prototype.createView = function () {
    for (var i = 0; i < 20; i++) {
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

  View.prototype.unSetCell = function (x, y, shapeClass) {
    var $cell = $('.board').find("[y=" + y + "]").find("[x=" + x + "]")
    $cell.removeClass(shapeClass)
  }
})();
