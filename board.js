const prompt = require("prompt-sync")();

module.exports = {
  getEmptyBoard: function () {
    let board = [ [ '.', '.', '.' ], [ '.', '.', '.' ], [ '.', '.', '.' ] ];
    return board;
        /*
        Should return a list with 3 sublists.
        Each sublist should contain 3 time the "." character
        */
  },

  displayBoard: function (board) {
      console.log(`${board.join("\n").replace(/,/g, " ")}`);
      
    
    /*
        Should console.log the tic tac toe board in a format similar to
            1   2   3
            A   X | O | . 
            ---+---+---
            B   X | O | .
            --+---+---
            C   0 | X | . 
            --+---+---
        */
  },

  isBoardFull: function (board) {
      if(!(board.flat().includes("."))) {
      console.log("tie");
      process.exit();
    } else return false;

    /*
        should return True if there are no more empty place on the board,
        otherwise should return False
        */
  },

  getWinningPlayer: function (board, currentPlayer) {
  
  this.checkRowsForWinner(board, currentPlayer);
  this.checkColumnsForWinner(board, currentPlayer);
  this.checkDiagonalForWinner(board, currentPlayer);
    
    /*
      Should return the player that wins based on the tic tac toe rules.
      If no player has won, than "None" is returned.
      */
  },

  checkRowsForWinner: function(board, currentPlayer) {
    let counter = 0;
    for (let i = 0; i < board.length; i++) {
      counter = 0;
      for (let j = 0; j < board[i].length; j++) {
        if(board[i][j] === currentPlayer) {
          counter++;
          if (counter === 3) {
            console.log(`${currentPlayer} has won`);
            process.exit();
          }
        }
    
      }
    }
  },
checkColumnsForWinner: function(board, currentPlayer) {
  let counter = 0;
  const COLUMNS = 3

  for (let i = 0; i < board.length; i++) {
    counter = 0;
    for (let j = 0; j < COLUMNS; j++) {
      if(board[j][i] === currentPlayer) {
        console.log(board[j][i]);
        counter++;
        if (counter === 3) {
          console.log(`${currentPlayer} has won`);
          process.exit();
        }
      }
  
    }
  }
},
checkDiagonalForWinner: function(board, currentPlayer) {
  if(board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
    console.log(`${currentPlayer} has won!`);
    process.exit();
  }
  if(board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
    console.log(`${currentPlayer} has won!`);
    process.exit();
  }
}
};

// run this function to test whether you have correctly implemented the other function
function checkBoards() {
  let board = getEmptyBoard();
  console.log(board);

  board = [["X", "O", "."], ["X", "O", "."][("0", "X", ".")]];

  console.log(`Should give out:"

        1   2   3
    A   X | O | . 
       ---+---+---
    B   X | O | .
       ---+---+---
    C   0 | X | . 
       ---+---+---`);
  displayBoard(board);

  board_1 = [
    ["X", "O", "."],
    ["X", "O", "."],
    ["X", "X", "O"],
  ];
  console.log("Should return False");
  console.log(isBoardFull(board_1));

  board_2 = [
    [".", "O", "O"],
    [".", "O", "X"],
    [".", "X", "X"],
  ];
  console.log("Should return False");
  console.log(isBoardFull(board_2));

  board_3 = [
    ["O", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "X"],
  ];
  console.log("Should return True");
  console.log(isBoardFull(board_3));

  board_4 = [
    ["X", "O", "."],
    ["X", "O", "."],
    ["X", "X", "O"],
  ];
  console.log("Should return X");
  console.log(getWinningPlayer(board_4));

  board_5 = [
    ["X", "O", "O"],
    ["X", "O", "."],
    ["O", "X", "X"],
  ];
  console.log("Should return O");
  console.log(getWinningPlayer(board_5));

  board_6 = [
    ["O", "O", "."],
    ["O", "X", "."],
    [".", "X", "."],
  ];
  console.log("Should return None");
  console.log(getWinningPlayer(board_6));
}