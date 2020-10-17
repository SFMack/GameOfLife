const rows = 25;
const cols = 25;

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
  } else {
    this.setAttribute("class", "alive");
  }
}

window.onload = () => {
  createGameGrid();
};
