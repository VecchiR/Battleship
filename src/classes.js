export class Ship {
    constructor(type) {
        this.type = type;
        this.length = this.getLength(type);
        this.hits = 0;
        this.sunk = false;
        this.boardMarker = this.getBoardMarker(type);
    }

    hit() {
        this.hits++;
        this.isSunk() ? this.sunk = true : null;
    }

    isSunk() {
        return !(this.length - this.hits > 0);
    }

    getLength(type = this.type) {
        switch (type) {
            case 'patrol boat':
                return 2;
            case 'submarine':
                return 3;
            case 'destroyer':
                return 3;
            case 'battleship':
                return 4;
            case 'carrier':
                return 5;
        }
    }

    getBoardMarker(type = this.type) {
        return type.at(0).toUpperCase();
    }
}

export class GameBoard {
    constructor() {
        this.board = this.createBoard();
        this.ships = {
            carrier: new Ship('carrier'),
            battleship: new Ship('battleship'),
            destroyer: new Ship('destroyer'),
            submarine: new Ship('submarine'),
            patrol: new Ship('patrol boat')
        };
    }

    createBoard() {
        let newBoard = new Array(10);
        for (let i = 0; i < 10; i++) {
            newBoard[i] = Array(10).fill('');
        }
        return newBoard;
    }

    resetBoard() {
        for (let i = 0; i < 10; i++) {
            this.board[i] = Array(10).fill('');
        }
    }

    placeShip(ship, [x, y], verticalOrientation = false) {
        let length = ship.getLength();

        // CHECK BEFORE PLACING = devolver um erro quando tenta placeShip onde nao tem espaço/ja tem ship
        let available = this.checkSpaceAvailable(length, [x, y], verticalOrientation);
        if (available.state === false) {
            return available.msg;
        }

        for (let i = 0; i < length; i++) {
            //if horizontal, i is added to y(columns), if vertical, i is added to x(rows)
            this.board
            [x - 1 + i * verticalOrientation]
            [y - 1 + i * !verticalOrientation]
                = ship.getBoardMarker();
        }

        return 'done!';
    }

    checkSpaceAvailable(shipLength, [x, y], verticalOrientation) {
        let availabilityResponse = {
            state: false,
            msg: 'Ship cannot be placed here!'
        }
        let i = 0;
        let foundConflict;
        while (i < shipLength) {
            try {
                foundConflict = this.board
                [x - 1 + i * verticalOrientation]
                [y - 1 + i * !verticalOrientation]
                    != '';
            } catch {
                return availabilityResponse;
            }

            if (foundConflict) {
                return availabilityResponse;
            }

            i++;
        }

        availabilityResponse.state = true;
        availabilityResponse.msg = '';
        return availabilityResponse;
    }

    getShipFromBoardMarker(marker) {
        switch (marker) {
            case 'P':
                return this.ships.patrol;
            case 'S':
                return this.ships.submarine;
            case 'D':
                return this.ships.destroyer;
            case 'B':
                return this.ships.battleship;
            case 'C':
                return this.ships.carrier;
        }
    }

    receiveAttack([x, y]) {
        let spaceContent = this.board[x - 1][y - 1];
        if (spaceContent === '') {
            return spaceContent = 'miss';
        }
        else {
            this.getShipFromBoardMarker(spaceContent).hit();
            return spaceContent = 'hit';
        };
    }

    validadeCoordinate([x, y]) {
        if (!(Number.isInteger(x) && x >= 1 && x <= 10)) { return false; }
        if (!(Number.isInteger(y) && y >= 1 && y <= 10)) { return false; }
        if (this.board[x - 1][y - 1] != '') { return false; }
        return true;
    }

    checkIfAllShipsSunk() {
        const shipArray = Object.entries(this.ships);
        return shipArray;
    }

}


export class Player {
    constructor(type = 'human') {
        this.type = type;
        this.playerBoard = new GameBoard();
    }
}

export class GameFlow {
    constructor() {
        this.player1 = null;
        this.player2 = null;
        this.playerTurn = null;
        this.gameOverMsg = null;
        this.gameOVerFlag = false;
    }

    setPlayers() {
        this.player1 = new Player();
        this.player2 = new Player();
        this.playerTurn = Math.floor(Math.random() * 2) + 1;
    }

    getActivePlayer() {
        if (this.playerTurn === 1) {
            return this.player1;
        } else {
            return this.player2;
        }
    }

    getOpponent() {
        if (this.playerTurn === 1) {
            return this.player2;
        } else {
            return this.player1;
        }
    }

    changeActivePlayer() {
        this.playerTurn = this.playerTurn === 1 ? 2 : 1;
    }

    selectSpace([x, y]) {
        if (!this.gameOVerFlag) {
            if (this.getOpponent().playerBoard.validadeCoordinate([x, y])) {



                //isso tem que mudar pelo "displayController"
                displayController.updDisplayBoard();



                this.checkGameOver();
                if (this.gameOverMsg) {


                    //isso tambem
                    displayController.updMsgDisplay(this.gameOverMsg);



                } else {
                    this.changeActivePlayer();


                    //e isso tambem
                    displayController.updMsgDisplay('turn');
                }
            }
        }
    }

    checkGameOver() {
        let board = gameboard.getBoard();
        let row = col = diag = ['', '', ''];
        let checkArr;
        let checkFull = ['', '', ''];
        this.gameOverMsg = false;

        function goCheck(arr, x) {
            let tempCheckFull = ['', '', ''];
            for (let i = 0; i < 3; i++) {
                if (arr[i].every((val) => val === arr[i][0]) && arr[i][0] != '') {
                    return true;
                } else if (arr[i].every((val) => val != '')) {
                    tempCheckFull[i] = 'full';
                } else {
                    tempCheckFull[i] = '';
                }
            }
            if (tempCheckFull.every((val) => val === 'full')) {
                checkFull[x] = 'full';
            } else {
                checkFull[x] = '';
            }
        }

        for (let x = 0; x < 3; x++) {
            if (x < 2) {
                diag = [board[2 * x][0], board[1][1], board[2 - (2 * x)][2]];
            }
            col = [board[0][x], board[1][x], board[2][x]];
            for (let y = 0; y < 3; y++) {
                row[y] = board[x][y];
            }
            checkArr = [row, col, diag];
            if (goCheck(checkArr, x)) {
                this.gameOVerFlag = true;
                this.gameOverMsg = `Game Over! ${this.getActivePlayer().name} wins!`;
                return;
            } else if (checkFull.every((val) => val === 'full')) {
                this.gameOVerFlag = true;
                this.gameOverMsg = "Game Over! It's a tie!";
                return;
            }
        }
    }

    turnOffGameOverFlag() {
        this.gameOVerFlag = false;
    }
}





// const modExp = {
//     Ship,
//     GameBoard,
//     Player
// };


// module.exports = modExp;