var canvas = document.getElementById("canvas");
canvas.width = bw;
canvas.height = bh;

var context = canvas.getContext("2d");

var img = document.getElementById("img");

var allBoardCoard = createBoardPosition();



var socket = io();

drawBoard(context, allBoardCoard);

var bA = document.getElementById("bA");
var bF = document.getElementById("bF");
var bK = document.getElementById("bK");
var bP = document.getElementById("bP");
var bS = document.getElementById("bS");
var bV = document.getElementById("bV");

var wA = document.getElementById("wA");
var wF = document.getElementById("wF");
var wK = document.getElementById("wK");
var wP = document.getElementById("wP");
var wS = document.getElementById("wS");
var wV = document.getElementById("wV");

document.addEventListener("click", onMouseClick, false);

var lastClicked;
var avaibleRect;

var clientID;
var clientType;
var clientTurn;


var attention = document.getElementById("attention")
var typeTitle = document.getElementById("type")

socket.on("disconnectSocket", info => {
  var a = info.type === "white" ? "beyaz" : "siyah";
  attention.innerText = `OPPSS!! ${a} oyundan ayrıldı`;
  attention.style.color = "blue";
})

socket.on("changesTurn", (info) => {
  clientTurn = info[clientType];

  var a = info.white ? "white" : "black";
  if (clientType === "viewer") {
    attention.style.color = "green";
    if (clientType === a) {
      attention.innerText = "Sıra beyazda"
    } else {
      attention.innerText = "Sıra siyahta";
    }
  } else {
    if (clientType === a) {
      attention.innerText = "Sizin Sıranız"
      attention.style.color = "green";
    } else {
      attention.innerText = "Sıra Rakipte";
      attention.style.color = "red";
    }
  }

  if (info.pleyedID !== clientID) {
    drawMapAgain();
    var clicked = info.info.clicked;
    var newclicked = info.info.newclicked;

    var clickedElement = allBoardCoard[clicked];

    var newElement = allBoardCoard[newclicked];


    if (newElement.current) {
      newElement.current.delete();
      newElement.current = clickedElement.current;
    }


    allBoardCoard[newclicked].draw(newPositonColor);

    clickedElement.current.delete();
    allBoardCoard[clicked].draw(oldPositionColor);
    clickedElement.current.draw(newElement);

    allBoardCoard[clicked].current = null;

  }

})
drawMapAgain = () => {
  var keys = Object.keys(allBoardCoard);


  keys.forEach((key) => {
    allBoardCoard[key].draw(allBoardCoard[key].color);
    if (allBoardCoard[key].current) {
      allBoardCoard[key].current.draw();
    }
  });
}

socket.on("gameStarted", (info) => {
  if (!clientID) {
    clientID = info.id;
    clientType = info.type;
    clientTurn = info.turn;
    var a = info.type === "white" ? "beyaz" : "siyah";
    typeTitle.innerText = `${a} taşlar sizin`;
    typeTitle.style.color = "purple"
  }
})

function moveElement(lastClicked, avaibleRect, clickedElem) {
  if (lastClicked) {
    if (lastClicked.current) {
      if (!clientTurn) {
        return;
      }
    }
    avaibleRect.forEach((element) => {
      if (element.x === clickedElem.x && element.y == clickedElem.y) {
        socket.emit('played', {
          id: clientID,
          type: clientType,
          clicked: lastClicked.current.pos.name,
          newclicked: clickedElem.name,
        });
        if (clickedElem.current) {
          clickedElem.current.delete();
          clickedElem.current = lastClicked.current;
        }
        lastClicked.current.delete();
        lastClicked.current.draw(element);
        var keys = Object.keys(allBoardCoard);
        keys.forEach((key) => {
          if (allBoardCoard[key].name === lastClicked.name) {
            if (lastClicked.current) {
              if (!clientTurn) {
                return;
              }
            }
            allBoardCoard[key].current = null;
          }
        });
      }
    });
  }
  avaibleRect = null;
}

function onMouseClick(e) {
  const rect = canvas.getBoundingClientRect();
  var posx = e.clientX - rect.left;
  var posy = e.clientY - rect.top;

  if (posx < 0 || posx > bw || posy < 0 || posy > bh) {
    return;
  }

  var ortax = posx - (posx % gridsize);
  var ortay = posy - (posy % gridsize);
  var keys = Object.keys(allBoardCoard);
  var clickedElem;

  keys.forEach((key) => {
    if (ortax === allBoardCoard[key].x && ortay === allBoardCoard[key].y) {
      clickedElem = allBoardCoard[key];
    }
  });
  clearAllMap(allBoardCoard, ortax, ortay);



  if (clickedElem.current) {
    if (clickedElem.current.type !== clientType) {
      if (!lastClicked) {
        return;
      }
    }

    if (lastClicked) {
      moveElement(lastClicked, avaibleRect, clickedElem);
      lastClicked = null;
      return;
    }
    lastClicked = clickedElem;
    avaibleRect = clickedElem.current.onClick(clickedElem, allBoardCoard);
  } else {
    moveElement(lastClicked, avaibleRect, clickedElem);
    lastClicked = null;
  }
}

var rookBlack1 = new Rook(context, allBoardCoard.a8, bK, Type.BLACK);

var rookBlack2 = new Rook(context, allBoardCoard.h8, bK, Type.BLACK);

var knightBlack1 = new Knight(context, allBoardCoard.b8, bA, Type.BLACK);

var knightBlack2 = new Knight(context, allBoardCoard.g8, bA, Type.BLACK);

var bishopBlack1 = new Bishop(context, allBoardCoard.c8, bF, Type.BLACK);

var bishopBlack2 = new Bishop(context, allBoardCoard.f8, bF, Type.BLACK);

var queenBlack = new Queen(context, allBoardCoard.e8, bS, Type.BLACK);

var kingBlack = new King(context, allBoardCoard.d8, bV, Type.BLACK);

for (var i = 0; i < 8; i++) {
  var text = letters[i] + "7";
  var pawnBlack = new Pawn(context, allBoardCoard[text], bP, Type.BLACK);
}

var rookWhite1 = new Rook(context, allBoardCoard.a1, wK, Type.WHITE);

var rookWhite2 = new Rook(context, allBoardCoard.h1, wK, Type.WHITE);

var knightWhite1 = new Knight(context, allBoardCoard.b1, wA, Type.WHITE);

var knightWhite2 = new Knight(context, allBoardCoard.g1, wA, Type.WHITE);

var bishopWhite1 = new Bishop(context, allBoardCoard.c1, wF, Type.WHITE);

var bishopWhite2 = new Bishop(context, allBoardCoard.f1, wF, Type.WHITE);

var queenWhite = new Queen(context, allBoardCoard.e1, wS, Type.WHITE);

var kingWhite = new King(context, allBoardCoard.d1, wV, Type.WHITE);

for (var i = 0; i < 8; i++) {
  var text = letters[i] + "2";
  var pawnWhite = new Pawn(context, allBoardCoard[text], wP, Type.WHITE);
}
