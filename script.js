// JS for tic-tac-toe game

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; i < columns; i++) {
            // Cell is not yet defined
            board[i].push(Cell());
        }
    }

    const selectCell = (row, column, player) => {

        const availableCells = board.filter(row => {
            for (j = 0; j < columns; j++) {
                row[j].getValue === 0;
            }
        }
        )

    }
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


    
}