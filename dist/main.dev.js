"use strict";

//Sets up buttons and score
scoreDisp = document.querySelector("#scoreValue");
resetButton = document.querySelector(".reset");
var score = 0; //Creates fresh gameboard

var gameGrid = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]]; //Checks if a tile contains 2048

var checkWin = function checkWin() {
  for (var o = 0; o < 4; o++) {
    for (var i = 0; i < 4; i++) {
      if (gameGrid[o][i] === 2048) {
        alert("You Win!");
        document.removeEventListener("keyup", control);
      }
    }
  }
}; //Check if no more moves can be made
// const checkLose = () => {
//   let zeros = 0;
//   for (let o = 0; o < 4; o++) {
//     for (let i = 0; i < 4; i++) {
//       if (gameGrid[o][i] == 0) {
//         zeros++;
//       }
//     }
//   }
//   if (zeros === 0) {
//     alert("You Lose");
//     document.removeEventListener("keyup", control);
//   }
// };
//Creates the initial Divs in HTML


var generate1stBoard = function generate1stBoard() {
  var HTML = "";

  for (var row = 0; row < gameGrid.length; row++) {
    for (var column = 0; column < gameGrid.length; column++) {
      HTML += "<p class=\"cell0 cell\">".concat(gameGrid[row][column], "</p>");
    }
  }

  document.querySelector(".gameBoard").innerHTML = HTML;
}; //Generates a new tile in an empty space


var getRandomtiles = function getRandomtiles() {
  var randomX = Math.floor(Math.random() * gameGrid.length);
  var randomY = Math.floor(Math.random() * gameGrid.length);

  if (gameGrid[randomX][randomY] == 0) {
    gameGrid[randomX][randomY] = 2;
  } else {
    getRandomtiles();
  } // checkLose();

}; //Translates the grid array into the divs


var gridTranslate = function gridTranslate() {
  var HTML = "";

  for (var row = 0; row < gameGrid.length; row++) {
    for (var column = 0; column < gameGrid.length; column++) {
      HTML += "<p class=\"cell".concat(gameGrid[row][column], " cell\">").concat(gameGrid[row][column], "</p>");
    }
  }

  document.querySelector(".gameBoard").innerHTML = HTML;
}; //Moves Tiles Right


var moveRight = function moveRight() {
  for (var i = 0; i < 4; i++) {
    var filteredRow = gameGrid[i].filter(function (num) {
      return num;
    });
    var missing = 4 - filteredRow.length;
    var zeros = Array(missing).fill(0);
    var newRow = zeros.concat(filteredRow);
    gameGrid[i][0] = newRow[0];
    gameGrid[i][1] = newRow[1];
    gameGrid[i][2] = newRow[2];
    gameGrid[i][3] = newRow[3];
  }
}; //Moves Tiles Left


var moveLeft = function moveLeft() {
  for (var i = 0; i < 4; i++) {
    var filteredRow = gameGrid[i].filter(function (num) {
      return num;
    });
    var missing = 4 - filteredRow.length;
    var zeros = Array(missing).fill(0);
    var newRow = filteredRow.concat(zeros);
    gameGrid[i][0] = newRow[0];
    gameGrid[i][1] = newRow[1];
    gameGrid[i][2] = newRow[2];
    gameGrid[i][3] = newRow[3];
  }
}; //Moves Tiles Down


var moveDown = function moveDown() {
  for (var i = 0; i < 4; i++) {
    var totalOne = gameGrid[0][i];
    var totalTwo = gameGrid[1][i];
    var totalThree = gameGrid[2][i];
    var totalFour = gameGrid[3][i];
    var column = [totalOne, totalTwo, totalThree, totalFour];
    var filteredColumn = column.filter(function (num) {
      return num;
    });
    var missing = 4 - filteredColumn.length;
    var zeros = Array(missing).fill(0);
    var newColumn = zeros.concat(filteredColumn);
    gameGrid[0][i] = newColumn[0];
    gameGrid[1][i] = newColumn[1];
    gameGrid[2][i] = newColumn[2];
    gameGrid[3][i] = newColumn[3];
  }
}; //Moves Tiles Up


var moveUp = function moveUp() {
  for (var i = 0; i < 4; i++) {
    var totalOne = gameGrid[0][i];
    var totalTwo = gameGrid[1][i];
    var totalThree = gameGrid[2][i];
    var totalFour = gameGrid[3][i];
    var column = [totalOne, totalTwo, totalThree, totalFour];
    var filteredColumn = column.filter(function (num) {
      return num;
    });
    var missing = 4 - filteredColumn.length;
    var zeros = Array(missing).fill(0);
    var newColumn = filteredColumn.concat(zeros);
    gameGrid[0][i] = newColumn[0];
    gameGrid[1][i] = newColumn[1];
    gameGrid[2][i] = newColumn[2];
    gameGrid[3][i] = newColumn[3];
  }
}; //Combines horizontal tiles


var mergeCells = function mergeCells() {
  for (var o = 0; o < 4; o++) {
    for (var i = 0; i < 4; i++) {
      if (gameGrid[o][i] === gameGrid[o][i + 1]) {
        var combineTotal = gameGrid[o][i] + gameGrid[o][i + 1];
        gameGrid[o][i] = combineTotal;
        gameGrid[o][i + 1] = 0;
        score += combineTotal;
        scoreDisp.innerHTML = score;
      }
    }
  }
}; //Combines vertical tiles


var mergeCellsVert = function mergeCellsVert() {
  for (var o = 0; o < 3; o++) {
    for (var i = 0; i < 4; i++) {
      if (gameGrid[o][i] === gameGrid[o + 1][i]) {
        var combineTotal = gameGrid[o][i] + gameGrid[o + 1][i];
        gameGrid[o][i] = combineTotal;
        gameGrid[o + 1][i] = 0;
        score += combineTotal;
        scoreDisp.innerHTML = score;
      }
    }
  }
};

resetButton.addEventListener("click", function (event) {
  initialise();
}); //Clears grid and generates new board

var initialise = function initialise() {
  gameGrid = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
  score = 0;
  scoreDisp.innerHTML = 0;
  generate1stBoard();
  getRandomtiles();
  getRandomtiles();
  gridTranslate();
}; //Assings arrow keys to controls


var control = function control(event) {
  if (event.keyCode === 39) {
    rightPress();
  } else if (event.keyCode === 37) {
    leftPress();
  } else if (event.keyCode === 38) {
    upPress();
  } else if (event.keyCode === 40) {
    downPress();
  }
};

document.addEventListener("keyup", control); //Right arrow key functions

var rightPress = function rightPress() {
  moveRight();
  mergeCells();
  moveRight();
  getRandomtiles();
  gridTranslate();
  checkWin();
}; //Left arrow key functions


var leftPress = function leftPress() {
  moveLeft();
  mergeCells();
  moveLeft();
  getRandomtiles();
  gridTranslate();
  checkWin();
}; //Down arrow key functions


var downPress = function downPress() {
  moveDown();
  mergeCellsVert();
  moveDown();
  getRandomtiles();
  gridTranslate();
  checkWin();
}; //Up arrow key functions


var upPress = function upPress() {
  moveUp();
  mergeCellsVert();
  moveUp();
  getRandomtiles();
  gridTranslate();
  checkWin();
};

initialise();