document.addEventListener('DOMContentLoaded', startGame)


function board(){
  cells = []

    for(let i =0;i<6;i++){
      for (let j=0;j<6;j++){

        cells.push({row: i, col: j, isMine: Math.random() < 0.2, hidden:true,isMarked:false})
      }
    }
  return {cells};
}
var board = board();
// Define your `board` object here!


function startGame () {
  // Don't remove this function call: it makes the game work!
  for(let i= 0; i<board.cells.length;i++){
     board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  displayBombs();
  lib.initBoard()
  document.addEventListener("click",checkForWin,false);
  document.addEventListener("contextmenu",checkForWin,false);
  document.addEventListener("click", displayBombs,false);
}
function numberOfBombs(){
  number = 0
  for(let i= 0; i<board.cells.length;i++){
      if(board.cells[i].isMine){number++}
  }
  return number;
}
function displayBombs(){
  let count= numberOfBombs();
  console.log(count);
  document.getElementById("numBombs").innerHTML = `number of bombarinos: ${count}`
  
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  
  for(let i =0;i<board.cells.length;i++){
    let cell = board.cells[i];
    if(cell.isMarked===false && cell.isMine){
      return}
    if(cell.hidden && cell.isMine === false){
        return}
    }
    return lib.displayMessage('You win!')
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var count = 0;
  var surroundingCells =  lib.getSurroundingCells(cell.row,cell.col);
  for(let i = 0; i<surroundingCells.length;i++){
      if(surroundingCells[i].isMine === true){count++}
  }
  return count;
}

