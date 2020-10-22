// for the grid
let rows = 30;
let cols = 30;
let currentGeneration = [rows];
let nextGeneration = [rows];

// for start button
let started = false;
let timer;
let reproductionSpeed = 1000;

// creates two-dimensional array
function createArrays() {
  for (let i = 0; i < rows; i++) {
    currentGeneration[i] = new Array(cols);
    nextGeneration[i] = new Array(cols);
  }
}

// sets the values of the two dimensional arrays
function initArrays() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      currentGeneration[i][j] = 0;
      nextGeneration[i][j] = 0;
    }
  }
}

function createGameGrid() {
  // select the gameGrid div
  let gameGrid = document.querySelector("#gameGrid");

  // create the table and give it an ID
  let table = document.createElement("table");
  table.setAttribute("id", "grid");

  for (let i = 0; i < rows; i++) {
    let tableRow = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", i + "_" + j);
      cell.setAttribute("class", "dead");
      cell.addEventListener("click", cellClick);
      tableRow.appendChild(cell);
    }
    table.appendChild(tableRow);
  }
  gameGrid.appendChild(table);
}

function cellClick() {
  let loc = this.id.split("_");
  let row = Number(loc[0]);
  let col = Number(loc[1]);

  if (this.className === "alive") {
    this.setAttribute("class", "dead");
    currentGeneration[row][col] = 0;
  } else {
    this.setAttribute("class", "alive");
    currentGeneration[row][col] = 1;
  }
}

// This function implements the rules of the game
function getNeighborCount(row, col) {
  let count = 0;
  let rowX = Number(row);
  let colX = Number(col);

  // Make sure we are not at first row
  if (rowX - 1 >= 0) {
    // check top neighbor
    if (currentGeneration[rowX - 1][colX] == 1) count++;
  }

  // Make sure we are not at the first cell (upper left corner)
  if (rowX - 1 >= 0 && colX - 1 >= 0) {
    // Check upper left neighbor
    if (currentGeneration[rowX - 1][colX - 1] == 1) count++;
  }

  // Make sure we are not on the first row last column (upper right corner)
  if (rowX - 1 >= 0 && colX + 1 < cols) {
    if (currentGeneration[rowX - 1][colX + 1] == 1) count++;
  }

  // Make sure we are not on the first column
  if (colX - 1 >= 0) {
    if (currentGeneration[rowX][colX - 1] == 1) count++;
  }

  // Make sure we are not on the last column
  if (colX + 1 < cols) {
    // check the right neighbor
    if (currentGeneration[rowX][colX + 1] == 1) count++;
  }

  // Make sure we are not on the bottom left corner
  if (rowX + 1 < rows && colX - 1 >= 0) {
    // check bottom left neighbor
    if (currentGeneration[rowX + 1][colX] == 1) count++;
  }

  // Make sure we are not on the bottom right
  if (rowX + 1 < rows && colX + 1 < cols) {
    // Check bottom right neighbor
    if (currentGeneration[rowX + 1][colX + 1] == 1) count++;
  }

  // Make sure we are not on the last row
  if (rowX + 1 < rows) {
    // Check bottom neighbor
    if (currentGeneration[rowX + 1][colX] == 1) count++;
  }

  return count;
}

function newNextGeneration() {
  for (row in currentGeneration) {
    for (col in currentGeneration[row]) {
      let neighbors = getNeighborCount(row, col);

      // Check the rules
      // If alive
      if (currentGeneration[row][col] == 1) {
        if (neighbors < 2) {
          nextGeneration[row][col] = 0;
        } else if (neighbors == 2 || neighbors == 3) {
          nextGeneration[row][col] = 1;
        } else if (neighbors > 3) {
          nextGeneration[row][col] = 0;
        }
      } else if (currentGeneration[row][col] == 0) {
        // If dead or empty
        if (neighbors >= 3) {
          // Propogate the species
          nextGeneration[row][col] = 1;
        }
      }
    }
  }
}

function updateCurrentGeneration() {
  for (row in currentGeneration) {
    for (col in currentGeneration[row]) {
      // Update the current generation with the results of newNextGeneration
      currentGeneration[row][col] = nextGeneration[row][col];
      // Set nextGeneration back to empty
      nextGeneration[row][col] = 0;
    }
  }
}

function updateGame() {
  let cell = "";
  for (row in currentGeneration) {
    for (col in currentGeneration[row]) {
      cell = document.getElementById(row + "_" + col);
      if (currentGeneration[row][col] == 0) {
        cell.setAttribute("class", "dead");
      } else {
        cell.setAttribute("class", "alive");
      }
    }
  }
}

function startStop() {
  let startStopButton = document.querySelector("#startStopButton");

  if (!started) {
    started = true;
    startStopButton.value = "Stop";
    updateUI();
  } else {
    started = false;
    startStopButton.value = "Start";
    clearTimeout(timer);
  }
}

function updateUI() {
  newNextGeneration();
  updateCurrentGeneration();
  updateGame();

  if (started) {
    timer = setTimeout(updateUI, reproductionSpeed);
  }
}

function changeCellColor() {}

function reset() {
  location.reload();
}

window.onload = () => {
  createGameGrid();
  createArrays();
  initArrays();
};
