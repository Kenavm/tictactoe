const { getWinningPlayer } = require("./board");
const board = require("./board");
const prompt = require("prompt-sync")();
let alreadyGuessed = [];

module.exports = {
  getPlayerMove: function (currentPlayer) {
    let move = "";

    while (true) {
      move = prompt(`${currentPlayer}, please put in a move: `);
      if (this.checkIfInputIsValid(move) && !alreadyGuessed.includes(move)) {
        alreadyGuessed.push(move);
        break;
      }
    }

    let coordinates = [];
    coordinates.push(this.convertLetterToNumber(move));
    coordinates.push(parseInt(move[1]) - 1);

    return coordinates;

  },
  convertLetterToNumber: function (move) {
    if (move[0] === "A") {
      return 0;
    } else if (move[0] === "B") {
      return 1;
    } else return 2;
  },

  checkIfInputIsValid: function (move) {
    let VALID_MOVES = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
    if (move === "quit") {
      process.exit();
    }
    if (VALID_MOVES.includes(move)) {
      return true;
    } else {
      console.log("please only use valid inputs");
      return false;
    }
  },

  getRandomAiCoordinates: function (gameBoard) {
    while (true) {
      let coordinatesOfAI = [];
      coordinatesOfAI.push(Math.floor(Math.random() * 3));
      coordinatesOfAI.push(Math.floor(Math.random() * 3));
      if (gameBoard[coordinatesOfAI[0]][coordinatesOfAI[1]] === ".") {
        return coordinatesOfAI;
      }
    }
  },

  getUnbeatableAiCoordinates: function (gameBoard, depth, isMaximizing, currentPlayer) {
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (gameBoard[i][j] === '.') {
            gameBoard[i][j] = "X";
            let score = this.getUnbeatableAiCoordinates(gameBoard, depth + 1, false);
            gameBoard[i][j] = '.';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (gameBoard[i][j] === '.') {
            gameBoard[i][j] = "O";
            let score = this.getUnbeatableAiCoordinates(gameBoard, depth + 1, true);
            gameBoard[i][j] = '.';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  },
};

// run this function to test whether you have correctly implemented the other functions
function checkCoordinates() {
  board_1 = [
    ["X", "X", "."],
    ["X", ".", "."],
    ["X", "X", "."],
  ];
  console.log(
    "It should console.log the coordinates selected by the human player"
  );
  coordinates = getPlayerMove(board_1, "X");
  console.log(coordinates);

  board_2 = [
    ["O", "O", "."],
    ["X", "O", "."],
    ["X", "X", "O"],
  ];
  console.log("The console.loged coordinate should be only (0,2) or (1,2)");
  console.log(getRandomAiCoordinates(board_2));
  console.log("The console.loged coordinate should be only (0,2) or (1,2)");
  console.log(getRandomAiCoordinates(board_2));
  console.log("The console.loged coordinate should be only (0,2) or (1,2)");
  console.log(getRandomAiCoordinates(board_2));

  board_3 = [
    ["O", "X", "X"],
    ["X", "O", "X"],
    ["X", "O", "X"],
  ];
  console.log("The console.loged coordinate should be None");
  console.log(getRandomAiCoordinates(board_3));

  board_4 = [
    [".", "O", "."],
    ["X", "O", "."],
    ["X", "X", "O"],
  ];
  console.log("The console.loged coordinate should always be (0, 0)");
  console.log(getUnbeatableAiCoordinates(board_4, "X"));

  board_5 = [
    ["X", "O", "."],
    ["X", ".", "."],
    ["O", "O", "X"],
  ];
  console.log("The console.loged coordinate should always be (1, 1)");
  console.log(getUnbeatableAiCoordinates(board_5, "O"));

  board_6 = [
    ["O", "O", "."],
    ["O", "X", "."],
    [".", "X", "."],
  ];
  console.log("The console.loged coordinate should either (0, 2) or (2, 0)");
  console.log(getUnbeatableAiCoordinates(board_6));
}

