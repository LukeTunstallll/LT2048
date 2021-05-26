const gameGrid = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
];

const generate1stBoard = () => {
  let HTML = "";

  for (let row = 0; row < gameGrid.length; row++) {
    for (let column = 0; column < gameGrid.length; column++) {
      HTML += `<p class="cell0 cell">${gameGrid[row][column]}</p>`;
    }
  }
  console.log(gameGrid);

  document.querySelector(".gameBoard").innerHTML = HTML;
};

// const generateBoard = () => {
//   let HTML = "";

//   for (let row = 0; row < gameGrid.length; row++) {
//     for (let column = 0; column < gameGrid.length; column++) {
//       HTML += `<p class="cell0 cell">${gameGrid[row][column]}</p>`;
//     }
//   }
//   console.log(gameGrid);

//   document.querySelector(".gameBoard").innerHTML = HTML;
// };

const getRandomtiles = () => {
  let randomX = Math.floor(Math.random() * gameGrid.length);
  let randomY = Math.floor(Math.random() * gameGrid.length);
  gameGrid[randomX][randomY] = 2;
  // const cellSelect = document.getElementsByClassName("cell");
  // if (cellSelect[randomNumber].classList.contains("cell0")) {
  //   cellSelect[randomNumber].classList.add("cell2");
  // } else getRandomtiles();
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
  console.log(gameGrid);
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
  console.log(gameGrid);
};

const mergeCells = () => {
  for (let i = 0; i < 4; i++) {
    if (gameGrid[0][i] === gameGrid[0][i + 1]) {
      let combineTotal = gameGrid[0][i] + gameGrid[0][i + 1];
      gameGrid[0][i] = combineTotal;
      gameGrid[0][i + 1] = 0;
    }
  }
  for (let i = 0; i < 4; i++) {
    if (gameGrid[1][i] === gameGrid[1][i + 1]) {
      let combineTotal = gameGrid[1][i] + gameGrid[1][i + 1];
      gameGrid[1][i] = combineTotal;
      gameGrid[1][i + 1] = 0;
    }
  }
  for (let i = 0; i < 4; i++) {
    if (gameGrid[2][i] === gameGrid[2][i + 1]) {
      let combineTotal = gameGrid[2][i] + gameGrid[2][i + 1];
      gameGrid[2][i] = combineTotal;
      gameGrid[2][i + 1] = 0;
    }
  }
  for (let i = 0; i < 4; i++) {
    if (gameGrid[3][i] === gameGrid[3][i + 1]) {
      let combineTotal = gameGrid[3][i] + gameGrid[3][i + 1];
      gameGrid[3][i] = combineTotal;
      gameGrid[3][i + 1] = 0;
    }
  }
};

// const drawGrid = () => {};

generate1stBoard();
getRandomtiles();
getRandomtiles();

const control = (event) => {
  if (event.keyCode === 39) {
    rightPress();
  } else if (event.keyCode === 37) {
    leftPress();
  }
  // else if (event.keyCode === 38) {
  //   upPress();
  // }else if (event.keyCode === 40) {
  //   downPress();
  // }
};

document.addEventListener("keyup", control);

const rightPress = () => {
  moveRight();
  mergeCells();
  moveRight();
  getRandomtiles();
};

const leftPress = () => {
  moveLeft();
  mergeCells();
  moveLeft();
  getRandomtiles();
};
