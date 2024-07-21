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
        board[row][column].select(game.getActivePlayer());
        //console.log(game.getActivePlayer().value);
        //console.log(typeof(board[row][column]));
        //console.log(board[row][column].getValue());

    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => 
        cell.getValue()));
        console.log(boardWithCellValues);
    }

    return { selectCell, printBoard };
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

function GameController( playerOneName = "Player One",
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
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
        let row = prompt("What row would you like to mark on?");
        let column = prompt("What column would you like to mark on?");
        playRound(row, column);
    }
    
    const playRound = (row, column) => {
        board.selectCell(row, column);
        console.log(`${getActivePlayer().name} placed an ${getActivePlayer().value}
            on row ${row}, column ${column}.`)
        
        switchActivePlayer();
        printNewRound();
    }

    return { printNewRound, playRound, getActivePlayer };
}

const game = GameController();
game.printNewRound();