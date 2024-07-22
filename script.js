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
        //console.log(game.getActivePlayer());
        if (board[row][column].getValue() !== 0) return;
        board[row][column].select(GameController.getActivePlayer());
        //console.log(game.getActivePlayer().value);
        //console.log(typeof(board[row][column]));
        //console.log(board[row][column].getValue());

    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => 
        cell.getValue()));
        console.table(boardWithCellValues);
    }

    return { selectCell, printBoard, board };
}

function createPlayer(name, value) {
    return { name, value };
}

function Cell() {
    let value = 0;

    const select = (player) => {
        value = player.value;
    }

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
            console.log(`${getActivePlayer().name} wins!`)
            return;
        }
        if (isTie()) {
            console.log("It's a tie! You two should run it back.");
            return;
        }
        switchActivePlayer();
        printNewRound();
    }

    const isWinner = () => {
        let boardGrid = board.board;
        //console.log(boardGrid);
        for (const player of players) {
            //console.log(player.value)
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

    return { printNewRound, playRound, getActivePlayer, isWinner };
})();

//const game = GameController();
GameController.printNewRound();