//onsole.log("zkouska")
//definovana praydna pole
let options = ["", "", "", "", "", "", "", "", ""];
//pocatecni hrac
let currentPlayer = "X";
let running = false;
//udaje z html
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartB");
//jak muzete vyhart
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//informace 
initializeGame();
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
//prubhe ovladnuti pole / kontrola
function cellClicked(){
  const cellIndex = this.getAttribute("cellIndex");
  //pokud je obsazeno
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
//samotne ovladani
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
//stridani hrace
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
//kontrola vyhry
function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }

    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
