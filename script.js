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

const pageDisplay = () => {

    const populateTile = (event) => {
        let selectedTile = event.target;
        let selectedTileRow = Number(selectedTile.getAttribute("data-rowcol").charAt(0));
        let selectedTileCol = Number(selectedTile.getAttribute("data-rowcol").charAt(2));
        //console.log(typeof(selectedTileCol));
        //console.log(selectedTileCol);
        //console.log(GameController.gameboard.board[selectedTileRow][selectedTileCol].getValue());
        if ((GameController.gameboard.board[selectedTileRow][selectedTileCol].getValue() === 0)) {
            GameController.gameboard.selectCell(selectedTileRow, selectedTileCol);
            GameController.playRound(selectedTileRow, selectedTileCol);
            selectedTile.textContent = GameController.gameboard.board[selectedTileRow][selectedTileCol].getValue();
        }
    }

    const boardContainer = document.querySelector(".board-container");
    boardContainer.addEventListener("click", populateTile);

    return { boardContainer, populateTile };
};

const GameController = (function( playerOneName = "Player One",
                                  playerTwoName = "Player Two" ) {
    const gameboard = Gameboard();

    const display = pageDisplay();

    const players = [
        createPlayer(playerOneName, "X"),
        createPlayer(playerTwoName, "O")
    ];

    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;
    
    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} placed an ${getActivePlayer().value} on row ${row}, column ${column}.`);
        if (isWinner()) {
            gameboard.printBoard();
            console.log(`${getActivePlayer().name} wins!`)
            return;
        }
        if (isTie()) {
            gameboard.printBoard();
            console.log("It's a tie! You two should run it back.");
            return;
        }
        switchActivePlayer();
        printNewRound();
    }

    const printNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn.`);
        gameboard.printBoard();
    }

    const isWinner = () => {
        let boardGrid = gameboard.board;
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
                    display.boardContainer.removeEventListener('click', display.populateTile);
                    return true;
                }            
        }
    }

    const isTie = () => {
        let boardGrid = gameboard.board;
        for (let i = 0; i < boardGrid.length; i++) {
            for (let j = 0; j < boardGrid[i].length; j++) {
                if (boardGrid[i][j].getValue() === 0) {
                    return false;
                }
            }
        }
        display.boardContainer.removeEventListener('click', display.populateTile);
        return true;
    }

    return { getActivePlayer, playRound, gameboard };
})();