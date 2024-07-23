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

    const populateTile = (event) => {
        let selectedTile = event.target;
        if ((selectedTile.textContent !== "X") && (selectedTile.textContent !== "O")) {
            selectedTile.textContent = getActivePlayer().value;
            let selectedTileRow = selectedTile.getAttribute("data-rowcol").charAt(0);
            let selectedTileCol = selectedTile.getAttribute("data-rowcol").charAt(2);
            populateBoardArray(selectedTileRow, selectedTileCol)
        }
    }

    const populateBoardArray = (selectedTileRow, selectedTileCol) => {
        playRound(selectedTileRow, selectedTileCol);
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

    const printNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn.`);
        board.printBoard();
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
                    pageDisplay.boardContainer.removeEventListener('click', populateTile);
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
        pageDisplay.boardContainer.removeEventListener('click', populateTile);
        return true;
    }

    return { getActivePlayer, populateTile, board };
})();

const pageDisplay =  (function() {

    const boardContainer = document.querySelector(".board-container");

    boardContainer.addEventListener("click", GameController.populateTile);


    const tiles = document.querySelectorAll(".tile");
    const tilesArray = Array.from(tiles);

    const tilesArray2d = [];

    for (let i = 0; i < GameController.board.board.length; i++) {
        tilesArray2d[i] = [];
        for (let j = 0; j < GameController.board.board[i].length; j++) {
            tilesArray2d[i].push(tilesArray.shift());
        }
    }

    return { boardContainer, tilesArray2d  };

})();