const menu = require("./menu"); // use it e.g. like menu.get_menu_option()
const board = require("./board");
const coordinate = require("./coordinates");

const HUMAN_VS_HUMAN = 1;
const RANDOM_AI_VS_RANDOM_AI = 2;
const HUMAN_VS_RANDOM_AI = 3;
const HUMAN_VS_UNBEATABLE_AI = 4;

let isGameRunning = true;
let gameMode = parseInt(menu.getMenuOption());
let gameBoard = board.getEmptyBoard();
let currentPlayer = "X";

function main() {
  if (gameMode === HUMAN_VS_HUMAN) {
    humanVsHuman();
  } else if (gameMode === RANDOM_AI_VS_RANDOM_AI) {
    randomAiVsRandomAi();
  } else if (gameMode === HUMAN_VS_RANDOM_AI) {
    humanVsRandomAi();
  } else {
  }
}
function changePlayer(currentPlayer) {
  if (currentPlayer === "X") {
    return "O";
  } else return "X";
}

function quit(input) {
  if (input === "quit") {
    process.exit();
  }
}
function humanVsHuman() {
  while (isGameRunning) {
    board.displayBoard(gameBoard);
    let humanCoord = coordinate.getPlayerMove(gameBoard, currentPlayer);
    quit(humanCoord);
    gameBoard[humanCoord[0]][humanCoord[1]] = currentPlayer;
    board.getWinningPlayer(gameBoard, currentPlayer);
    board.isBoardFull(gameBoard);
    currentPlayer = changePlayer(currentPlayer);
  }
}

function randomAiVsRandomAi() {
  while (isGameRunning) {
    board.displayBoard(gameBoard);
    let AICoord = coordinate.getRandomAiCoordinates(board, currentPlayer);
    gameBoard[AICoord[0]][AICoord[1]] = currentPlayer;
    board.getWinningPlayer(gameBoard, currentPlayer);
    board.isBoardFull(gameBoard);
    currentPlayer = changePlayer(currentPlayer);
  }
}

function humanVsRandomAi() {
  while (isGameRunning) {
    if (currentPlayer === "X") {
      board.displayBoard(gameBoard);
      let humanCoord = coordinate.getPlayerMove(gameBoard, currentPlayer);
      quit(humanCoord);
      gameBoard[humanCoord[0]][humanCoord[1]] = currentPlayer;
      board.getWinningPlayer(gameBoard, currentPlayer);
      board.isBoardFull(gameBoard);
      currentPlayer = changePlayer(currentPlayer);
    } else {
      board.displayBoard(gameBoard);
      let AICoord = coordinate.getRandomAiCoordinates(gameBoard, currentPlayer);
      gameBoard[AICoord[0]][AICoord[1]] = currentPlayer;
      board.getWinningPlayer(gameBoard, currentPlayer);
      board.isBoardFull(gameBoard);
      currentPlayer = changePlayer(currentPlayer);
    }
  }
}

main();
