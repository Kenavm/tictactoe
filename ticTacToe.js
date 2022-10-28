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
  } else if (gameMode === HUMAN_VS_UNBEATABLE_AI) {
    humanVsUnbeatableAi();
  }
}

function humanVsHuman() {
  while (isGameRunning) {
    board.displayBoard(gameBoard);
    let humanCoord = coordinate.getPlayerMove(currentPlayer);
    quit(humanCoord);
    gameBoard[humanCoord[0]][humanCoord[1]] = currentPlayer;
    let winningPlayer = board.getWinningPlayer(gameBoard, currentPlayer);
    if (winningPlayer) {
      board.displayBoard(gameBoard);
      console.log(`Player ${currentPlayer} has won!`);
      process.exit();
    }
    let isBoardFull = board.isBoardFull(gameBoard);
    if (isBoardFull)
      if (board.isBoardFull(gameBoard)) {
        board.displayBoard(gameBoard);
        console.log(`tie!`);
        process.exit();
      }
    currentPlayer = changePlayer(currentPlayer);
  }
}
async function randomAiVsRandomAi() {
  while (isGameRunning) {
    board.displayBoard(gameBoard);
    let AICoord = coordinate.getRandomAiCoordinates(gameBoard);
    gameBoard[AICoord[0]][AICoord[1]] = currentPlayer;
    let winningPlayer = board.getWinningPlayer(gameBoard, currentPlayer);
    if (winningPlayer) {
      board.displayBoard(gameBoard);
      console.log(`Player ${currentPlayer} has won!`);
      process.exit();
    }
    let isBoardFull = board.isBoardFull(gameBoard);
    if (isBoardFull) {
      board.displayBoard(gameBoard);
      console.log(`tie!`);
      process.exit();
    }
    currentPlayer = changePlayer(currentPlayer);
    await delay(1000);
  }
}
async function humanVsRandomAi() {
  while (isGameRunning) {
    if (currentPlayer === "X") {
      board.displayBoard(gameBoard);
      let humanCoord = coordinate.getPlayerMove(currentPlayer);
      quit(humanCoord);
      gameBoard[humanCoord[0]][humanCoord[1]] = currentPlayer;
      let winningPlayer = board.getWinningPlayer(gameBoard, currentPlayer);
      if (winningPlayer) {
        board.displayBoard(gameBoard);
        console.log(`Player ${currentPlayer} has won!`);
        process.exit();
      }
      let isBoardFull = board.isBoardFull(gameBoard);
      if (isBoardFull) {
        board.displayBoard(gameBoard);
        console.log(`tie!`);
        process.exit();
      }
      currentPlayer = changePlayer(currentPlayer);
    } else {
      await delay(500);
      board.displayBoard(gameBoard);
      let AICoord = coordinate.getRandomAiCoordinates(gameBoard);
      gameBoard[AICoord[0]][AICoord[1]] = currentPlayer;
      let winningPlayer = board.getWinningPlayer(gameBoard, currentPlayer);
      if (winningPlayer) {
        board.displayBoard(gameBoard);
        console.log(`Player ${currentPlayer} has won!`);
        process.exit();
      }
      let isBoardFull = board.isBoardFull(gameBoard);
      if (isBoardFull) {
        board.displayBoard(gameBoard);
        console.log(`tie!`);
        process.exit();
      }
      currentPlayer = changePlayer(currentPlayer);
    }
  }
}
function humanVsUnbeatableAi() {
  // AI to make its turn
  while (true) {
    if (currentPlayer === "O") {
      board.displayBoard(gameBoard);
      let humanCoord = coordinate.getPlayerMove(currentPlayer);
      quit(humanCoord);
      gameBoard[humanCoord[0]][humanCoord[1]] = currentPlayer;
      let winningPlayer = board.getWinningPlayer(gameBoard, currentPlayer);
      if (winningPlayer) {
        board.displayBoard(gameBoard);
        console.log(`Player ${currentPlayer} has won!`);
        process.exit();
      }
      let isBoardFull = board.isBoardFull(gameBoard);
      if (isBoardFull) {
        board.displayBoard(gameBoard);
        console.log(`tie!`);
        process.exit();
      }
      currentPlayer = changePlayer(currentPlayer);
    } else {
      board.displayBoard(gameBoard);
      let bestScore = -Infinity;
      let move;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (gameBoard[i][j] === ".") {
            gameBoard[i][j] = currentPlayer;
            let score = coordinate.getUnbeatableAiCoordinates(
              gameBoard,
              0,
              false,
              currentPlayer
            );
            gameBoard[i][j] = ".";
            if (score > bestScore) {
              bestScore = score;
              move = { i, j };
            }
          }
        }
      }
      gameBoard[move.i][move.j] = currentPlayer;
      let winningPlayer = board.getWinningPlayer(gameBoard, currentPlayer);
      if (winningPlayer) {
        board.displayBoard(gameBoard);
        console.log(`Player ${currentPlayer} has won!`);
        process.exit();
      }
      let isBoardFull = board.isBoardFull(gameBoard);
      if (isBoardFull) {
        board.displayBoard(gameBoard);
        console.log(`tie!`);
        process.exit();
      }
      currentPlayer = changePlayer(currentPlayer);
    }
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

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}

main();
