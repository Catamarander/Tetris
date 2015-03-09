(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.board = new Tetris.Board();
    this.view = new Tetris.View();
    var classes = ["i", "o", "t", "z", "s", "j", "l"]
    for (var i = 0; i < classes.length; i++) {
      this.view.setCell(i, 4, classes[i]);
    }
  };
})();
