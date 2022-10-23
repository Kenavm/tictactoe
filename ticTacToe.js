const menu = require("./menu"); // use it e.g. like menu.get_menu_option()
const board = require("./board");
const coordinate = require("./coordinates");

const HUMAN_VS_HUMAN = 1;
const RANDOM_AI_VS_RANDOM_AI = 2;
const HUMAN_VS_RANDOM_AI = 3;
const HUMAN_VS_UNBEATABLE_AI = 4;

function main() {
  let gameMode = menu.getMenuOption();
  let gameBoard = board.getEmptyBoard();
  let isGameRunning = true;
  let currentPlayer = "X";
  while (isGameRunning) {
    quit(gameMode);
   
    board.displayBoard(gameBoard);
    
    /* TODO

        in each new iteration of the while loop the program should 
        alternate the value of `currentPlayer` from `X` to `O`
        */
    

    /* TODO

        based on the value of the variables `game_mode` and `currentPlayer` 
        the programm should should choose betwen the functions
        get_random_ai_coordinates or get_umbeatable_ai_coordinates or get_human_coordinates
        */
    let humanCoord = coordinate.getPlayerMove(board, currentPlayer);
    quit(humanCoord);
    gameBoard[humanCoord[0]][humanCoord[1]] = currentPlayer;
    
    
    /* TODO 

        based on the values of `winning_player` and `its_a_tie` the program
        should either stop displaying a winning/tie message 
        OR continue the while loop
        */
    board.getWinningPlayer(gameBoard, currentPlayer);
    board.isBoardFull(gameBoard);
    currentPlayer = changePlayer(currentPlayer);
  }
}
function changePlayer(currentPlayer) {
  if(currentPlayer === "X") {
    return "O";
  } else return "X";
}

function quit(input) {
  if(input === "quit") {
    process.exit();
  }
}
main();
