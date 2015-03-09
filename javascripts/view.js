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
          y: i,
          class: "tetris-cell"
        })

        $row.append($cell)
      }

      $('.board').append($row)
    }
  }
})();