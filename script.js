// JS for tic-tac-toe game

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const selectCell = (row, column) => {
        if (board[row][column].getValue() !== 0) return;
        board[row][column].select(GameController.getActivePlayer());
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.table(boardWithCellValues);
    }
    return { selectCell, printBoard, board };
}

function createPlayer(name, value) {
    return { name, value };
}

function Cell() {
    let value = 0;

    const select = (player) => value = player.value;

    const getValue = () => value;

    return { select, getValue };
}

const GameController = (function( playerOneName = "Player One",
                                  playerTwoName = "Player Two" ) {
    const board = Gameboard();

    const players = [
        createPlayer(playerOneName, "X"),
        createPlayer(playerTwoName, "O")
    ];

    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn.`);
        board.printBoard();
        askForUserInput();
    }

    const askForUserInput = () => {
        let row = prompt("What row would you like to mark on?");
        let column = prompt("What column would you like to mark on?");
        playRound(row, column);
    }
    
    const playRound = (row, column) => {
        board.selectCell(row, column);
        console.log(`${getActivePlayer().name} placed an ${getActivePlayer().value} on row ${row}, column ${column}.`);
        if (isWinner()) {
            board.printBoard();
            console.log(`${getActivePlayer().name} wins!`)
            return;
        }
        if (isTie()) {
            board.printBoard();
            console.log("It's a tie! You two should run it back.");
            return;
        }
        switchActivePlayer();
        printNewRound();
    }

    const isWinner = () => {
        let boardGrid = board.board;
        for (const player of players) {
            // Checking 3 in a row along rows
            if (((boardGrid[0][0].getValue() === player.value) &&
                 (boardGrid[0][1].getValue() === player.value) &&
                 (boardGrid[0][2].getValue() === player.value))
                 ||
                ((boardGrid[1][0].getValue() === player.value) &&
                 (boardGrid[1][1].getValue() === player.value) &&
                 (boardGrid[1][2].getValue() === player.value))
                 ||
                ((boardGrid[2][0].getValue() === player.value) &&
                 (boardGrid[2][1].getValue() === player.value) &&
                 (boardGrid[2][2].getValue() === player.value))
                 ||
            // Checking 3 in a row along columns
                ((boardGrid[0][0].getValue() === player.value) &&
                 (boardGrid[1][0].getValue() === player.value) &&
                 (boardGrid[2][0].getValue() === player.value))
                 ||
                ((boardGrid[0][1].getValue() === player.value) &&
                 (boardGrid[1][1].getValue() === player.value) &&
                 (boardGrid[2][1].getValue() === player.value))
                 ||
                ((boardGrid[0][2].getValue() === player.value) &&
                 (boardGrid[1][2].getValue() === player.value) &&
                 (boardGrid[2][2].getValue() === player.value))
                 ||
            // Checking 3 in a row across diagonals
                ((boardGrid[0][0].getValue() === player.value) &&
                 (boardGrid[1][1].getValue() === player.value) &&
                 (boardGrid[2][2].getValue() === player.value))
                 ||
                ((boardGrid[0][2].getValue() === player.value) &&
                 (boardGrid[1][1].getValue() === player.value) &&
                 (boardGrid[2][0].getValue() === player.value))) {
                    return true;
                }            
        }
    }

    const isTie = () => {
        let boardGrid = board.board;
        for (let i = 0; i < boardGrid.length; i++) {
            for (let j = 0; j < boardGrid[i].length; j++) {
                if (boardGrid[i][j].getValue() === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    const populateTile = (event) => {
        //console.log(event.target)
        let selectedTile = event.target;
        selectedTile.textContent = getActivePlayer().value;
        let selectedTileRow = selectedTile.getAttribute("data-rowcol").charAt(0);
        //console.log(selectedTileRow);
        let selectedTileCol = selectedTile.getAttribute("data-rowcol").charAt(2);
        //console.log(selectedTileCol);
    }

    const populateBoardArray = () => {

    }

    return { printNewRound, getActivePlayer, populateTile, board };
})();

const pageDisplay =  (function() {

    const boardContainer = document.querySelector(".board-container");

    boardContainer.addEventListener("click", GameController.populateTile);

    console.log(boardContainer);

    // Tiles
    /*
    const tile_00 = document.querySelector("div[data-rowcol = '0-0']");
    const tile_01 = document.querySelector("div[data-rowcol = '0-1']");
    const tile_02 = document.querySelector("div[data-rowcol = '0-2']");
    const tile_10 = document.querySelector("div[data-rowcol = '1-0']");
    const tile_11 = document.querySelector("div[data-rowcol = '1-1']");
    const tile_12 = document.querySelector("div[data-rowcol = '1-2']");
    const tile_20 = document.querySelector("div[data-rowcol = '2-0']");
    const tile_21 = document.querySelector("div[data-rowcol = '2-1']");
    const tile_22 = document.querySelector("div[data-rowcol = '2-2']");
    */

    const tiles = document.querySelectorAll(".tile");
    const tilesArray = Array.from(tiles);

    const tilesArray2d = [];

    //console.log(GameController.board.board.length);
    //console.log(GameController.board.board[0].length);

    for (let i = 0; i < GameController.board.board.length; i++) {
        tilesArray2d[i] = [];
        for (let j = 0; j < GameController.board.board[i].length; j++) {
            tilesArray2d[i].push(tilesArray.shift());
        }
    }

    const initializeTiles = () => {
        for (let i = 0; i < GameController.board.board.length; i++) {
            for (let j = 0; j < GameController.board.board[i].length; j++) {
                tilesArray2d[i][j].textContent = "";
                //console.log(tilesArray2d[i][j]);
            }
        }
    }

    //console.log(tilesArray2d);

    return { boardContainer, tilesArray2d, initializeTiles };

})();

//const game = GameController();
//GameController.printNewRound();

//

/*

Let's think carefully about how I want to do this:

- I can create the board in html like I have
- I want to create a function that will populate each grid tiles
  with the correct cell values from Gameboard().board
    - To do this, in my display object, I'll iterate over the 2d array,
      and for each element, extract their cell value and make it the textContent
      for a given div
    - I already have an array of divs, so I can make it a 2d array to match them up easier
- I want to add an event listener to the container upon click that will take the player's
  value, and populate both corresponding tile and the array with the value

*/