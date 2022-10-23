const prompt = require("prompt-sync")();

const MENU =
  "1. Human vs Human \n2. Random AI vs Random AI \n3. Human vs Random AI\n4. Human vs Unbeatable AI";
  const VALID_INPUT = ["1", "2", "3", "4"];
module.exports = {

 getMenuOption: function() {
    console.log(MENU+"\n");

    let gameMode = prompt("What mode do you wanna play? [1|2|3|4]: ");

    if (gameMode === "quit") {
      process.exit();
    }

    while (!VALID_INPUT.includes(gameMode)) {
      console.log("That's not a valid game mode");
      gameMode = prompt("Please use another input: ");
    }
    return gameMode;
    /*
        Should print a menu with the following options:
        1. Human vs Human
        2. Random AI vs Random AI
        3. Human vs Random AI
        4. Human vs Unbeatable AI
        The function should return a number between 1-4.
        If the user will enter invalid data (for example 5), than a message will appear
        asking to input a new value.
        */
  },
}

// run this function to test whether you have correctly implemented the other function
function checkOptions()
{
    let option = getMenuOption();
    console.log("If the user selected 1, it should print 1");
    console.log(option);
}

