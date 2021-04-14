function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
createBoardPosition = () => {
  var boardCord = {};
  var array = ["a", "b", "c", "d", "e", "f", "g", "h"];
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      boardCord[array[i] + (8 - j)] = {
        name: array[i] + (8 - j),
        x: i * gridsize,
        y: j * gridsize,
        center: {
          x: i * gridsize + gridsize / 2,
          y: j * gridsize + gridsize / 2,
        },
        current: null,
        color: null,
        writeText: null,
        text: null,
        draw: null,
      };
    }
  }
  return boardCord;
};

drawBoard = (context, allCord) => {
  var keys = Object.keys(allCord);
  var white = true;
  var lastLetter = "a";
  var number = 8;
  keys.forEach((element) => {
    var letter = element.slice(0, 1);
    var pos = allCord[element];
    if (lastLetter !== letter) {
      lastLetter = letter;
    } else {
      white = !white;
    }
    context.beginPath();
    allCord[element].color = white ? colorDark : colorBright;
    context.fillStyle = white ? colorDark : colorBright;
    context.fillRect(pos.x, pos.y, gridsize, gridsize);
    allCord[element].draw = (color) => {
      context.fillStyle = color;
      context.fillRect(pos.x, pos.y, gridsize, gridsize);
    }
    if (number > 0) {
      var color = !white ? colorDark : colorBright;
      context.fillStyle = color;
      context.fillText(number, pos.x, pos.y + 10);

      allCord[element].text = number;

      allCord[element].writeText = (text) => {
        context.fillStyle = color;
        context.fillText(text, pos.x, pos.y + 10);
      };
      number--;
    }
    if (element.includes("1")) {
      var color = !white ? colorDark : colorBright;
      context.fillStyle = color;
      context.fillText(letter, pos.x + gridsize - 10, pos.y + gridsize - 5);

      allCord[element].text = letter;

      allCord[element].writeText = (text) => {
        context.fillStyle = color;
        context.fillText(text, pos.x + gridsize - 10, pos.y + gridsize - 5);
      };
    }
  });
};
function clearAllMap(allCord, ortax, ortay) {
  var keys = Object.keys(allBoardCoard);
  keys.forEach((key) => {

    if (allCord[key].current) {
      allCord[key].current.clicked = true;
      allCord[key].current.onClick(allCord[key], allCord);
      selected = null;
    }

  });
}
