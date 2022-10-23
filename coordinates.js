const board = require("./board");
const prompt = require("prompt-sync")();
let alreadyGuessed = [];
module.exports = {
  getPlayerMove: function (board, current_player) {
    let move = "";

    while (true) {
      move = prompt(`${current_player}, please put in a move: `);
      if (this.checkIfInputIsValid(move) && !alreadyGuessed.includes(move)) {
        alreadyGuessed.push(move);
        break;
      }
    }

    let coordinates = [];
    coordinates.push(this.convertLetterToNumber(move));
    coordinates.push(parseInt(move[1]) - 1);

    return coordinates;

    /*
        Should return the read coordinates for the tic tac toe board from the terminal.
        The coordinates should be in the format  letter, number where the letter is 
        A, B or C and the number 1, 2 or 3.
        If the user enters an invalid coordinate (like Z0 or 1A, A11, sadfdsaf) 
        than a warning message should appear and the coordinates reading process repeated.
        If the user enters a coordinate that is already taken on the board.
        than a warning message should appear and the coordinates reading process repeated.
        If the user enters the word "quit" in any format of capitalized letters the program
        should stop.
        */
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

  getRandomAiCoordinates: function (board, current_player) {
    //tbd: check if space in board is already used

    let coordinatesOfAI = [];
    
    coordinatesOfAI[0] = Math.floor(Math.random() * 3);
    coordinatesOfAI[1] = Math.floor(Math.random() * 3);
    

    return coordinatesOfAI;
    /*
        Should return a tuple of 2 numbers. 
        Each number should be between 0-2.
        The chosen number should be only a free coordinate from the board.
        If the board is full (all spots taken by either X or O) than "None"
        should be returned.
        */
  },

  getUnbeatableAiCoordinates: function (board, current_player) {
    /*
        Should return an array of 2 numbers. 
        Each number should be between 0-2.
        The chosen number should be only a free coordinate from the board.
        The chosen coordinate should always stop the other player from winning or
        maximize the current player's chances to win.
        If the board is full (all spots taken by either X or O) than "None"
        should be returned.
        */
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
