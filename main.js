scoreDisp = document.querySelector("#scoreValue");
let score = 0;

const gameGrid = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
];

const checkWin = () => {
  for (let o = 0; o < 4; o++) {
    for (let i = 0; i < 4; i++) {
      if (gameGrid[o][i] === 2048) {
        alert("You Win!");
        document.removeEventListener("keyup", control);
      }
    }
  }
};

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

const generate1stBoard = () => {
  let HTML = "";

  for (let row = 0; row < gameGrid.length; row++) {
    for (let column = 0; column < gameGrid.length; column++) {
      HTML += `<p class="cell0 cell">${gameGrid[row][column]}</p>`;
    }
  }
  document.querySelector(".gameBoard").innerHTML = HTML;
};

const getRandomtiles = () => {
  let randomX = Math.floor(Math.random() * gameGrid.length);
  let randomY = Math.floor(Math.random() * gameGrid.length);
  if (gameGrid[randomX][randomY] == 0) {
    gameGrid[randomX][randomY] = 2;
  } else {
    getRandomtiles();
  }
  // checkLose();
};

const gridTranslate = () => {
  let HTML = "";

  for (let row = 0; row < gameGrid.length; row++) {
    for (let column = 0; column < gameGrid.length; column++) {
      HTML += `<p class="cell${gameGrid[row][column]} cell">${gameGrid[row][column]}</p>`;
    }
  }
  document.querySelector(".gameBoard").innerHTML = HTML;
};

const moveRight = () => {
  for (let i = 0; i < 4; i++) {
    let filteredRow = gameGrid[i].filter((num) => num);
    let missing = 4 - filteredRow.length;
    let zeros = Array(missing).fill(0);
    let newRow = zeros.concat(filteredRow);

    gameGrid[i][0] = newRow[0];
    gameGrid[i][1] = newRow[1];
    gameGrid[i][2] = newRow[2];
    gameGrid[i][3] = newRow[3];
  }
};

const moveLeft = () => {
  for (let i = 0; i < 4; i++) {
    let filteredRow = gameGrid[i].filter((num) => num);
    let missing = 4 - filteredRow.length;
    let zeros = Array(missing).fill(0);
    let newRow = filteredRow.concat(zeros);

    gameGrid[i][0] = newRow[0];
    gameGrid[i][1] = newRow[1];
    gameGrid[i][2] = newRow[2];
    gameGrid[i][3] = newRow[3];
  }
};

const moveDown = () => {
  for (let i = 0; i < 4; i++) {
    let totalOne = gameGrid[0][i];
    let totalTwo = gameGrid[1][i];
    let totalThree = gameGrid[2][i];
    let totalFour = gameGrid[3][i];
    let column = [totalOne, totalTwo, totalThree, totalFour];

    let filteredColumn = column.filter((num) => num);
    let missing = 4 - filteredColumn.length;
    let zeros = Array(missing).fill(0);
    let newColumn = zeros.concat(filteredColumn);

    gameGrid[0][i] = newColumn[0];
    gameGrid[1][i] = newColumn[1];
    gameGrid[2][i] = newColumn[2];
    gameGrid[3][i] = newColumn[3];
  }
};

const moveUp = () => {
  for (let i = 0; i < 4; i++) {
    let totalOne = gameGrid[0][i];
    let totalTwo = gameGrid[1][i];
    let totalThree = gameGrid[2][i];
    let totalFour = gameGrid[3][i];
    let column = [totalOne, totalTwo, totalThree, totalFour];

    let filteredColumn = column.filter((num) => num);
    let missing = 4 - filteredColumn.length;
    let zeros = Array(missing).fill(0);
    let newColumn = filteredColumn.concat(zeros);

    gameGrid[0][i] = newColumn[0];
    gameGrid[1][i] = newColumn[1];
    gameGrid[2][i] = newColumn[2];
    gameGrid[3][i] = newColumn[3];
  }
};

const mergeCells = () => {
  for (let o = 0; o < 4; o++) {
    for (let i = 0; i < 4; i++) {
      if (gameGrid[o][i] === gameGrid[o][i + 1]) {
        let combineTotal = gameGrid[o][i] + gameGrid[o][i + 1];
        gameGrid[o][i] = combineTotal;
        gameGrid[o][i + 1] = 0;
        score += combineTotal;
        scoreDisp.innerHTML = score;
      }
    }
  }
};

const mergeCellsVert = () => {
  for (let o = 0; o < 3; o++) {
    for (let i = 0; i < 4; i++) {
      if (gameGrid[o][i] === gameGrid[o + 1][i]) {
        let combineTotal = gameGrid[o][i] + gameGrid[o + 1][i];
        gameGrid[o][i] = combineTotal;
        gameGrid[o + 1][i] = 0;
        score += combineTotal;
        scoreDisp.innerHTML = score;
      }
    }
  }
};

// const drawGrid = () => {};

generate1stBoard();
getRandomtiles();
getRandomtiles();
gridTranslate();

const control = (event) => {
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

document.addEventListener("keyup", control);

const rightPress = () => {
  moveRight();
  mergeCells();
  moveRight();
  getRandomtiles();
  gridTranslate();
  checkWin();
};

const leftPress = () => {
  moveLeft();
  mergeCells();
  moveLeft();
  getRandomtiles();
  gridTranslate();
  checkWin();
};

const downPress = () => {
  moveDown();
  mergeCellsVert();
  moveDown();
  getRandomtiles();
  gridTranslate();
  checkWin();
};

const upPress = () => {
  moveUp();
  mergeCellsVert();
  moveUp();
  getRandomtiles();
  gridTranslate();
  checkWin();
};
