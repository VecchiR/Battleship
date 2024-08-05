export class Ship {
    constructor(type) {
        this.type = type;
        this.length = this.getLength(type);
        this.hits = 0;
        this.sunk = null;
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
        ship.sunk = false;
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
            return this.board[x - 1][y - 1] = 'miss';
        }
        else {
            this.getShipFromBoardMarker(spaceContent).hit();
            return this.board[x - 1][y - 1] = 'hit';
        };
    }

    validadeCoordinate([x, y]) {
        if (!(Number.isInteger(x) && x >= 1 && x <= 10)) { return false; }
        if (!(Number.isInteger(y) && y >= 1 && y <= 10)) { return false; }
        const coordinateContent = this.board[x - 1][y - 1];
        if (coordinateContent === 'hit' || coordinateContent === 'miss') { return false; }
        return true;
    }

    checkIfAllShipsSunk() {
        const shipsArray = Object.values(this.ships);
        return shipsArray.every(ship => {
            return ship.sunk === true || ship.sunk === null;
        });

    }

}

export class Player {
    constructor(name, type = 'human') {
        this.name = name;
        this.type = type;
        this.playerBoard = new GameBoard();
        this.attackLog = new Log();
    }
}

export class Log {
    constructor() {
        this.allAttacks = [];
    }

    recordAttack(arr) {
        this.allAttacks.push(arr);
    }

    getLastAttack() {
        try {
            return this.allAttacks[this.allAttacks.length - 1];
        } catch {
            return null;
        }
    }

    getLastAttackCoordinate() {
        try {
            return this.getLastAttack()[0];
        } catch {
            return null;
        }
    }

    getLastAttackOutcome() {
        try {
            return this.getLastAttack()[1];
        } catch {
            return null;
        }
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

    setPlayers(p1name, p2name, p2type) {
        this.player1 = new Player(p1name);
        this.player2 = new Player(p2name, p2type);
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
        if (this.gameOVerFlag) { return 'Game is already over!'; }

        if (this.getOpponent().playerBoard.validadeCoordinate([x, y])) {

            let outcome = this.getOpponent().playerBoard.receiveAttack([x, y]);
            this.getActivePlayer().attackLog.recordAttack([[x, y], outcome]);

            //isso tem que refactor por conta do "displayController"
            //      displayController.updDisplayBoard();


            if (this.checkGameOver()) {
                //isso tambem
                //      displayController.updMsgDisplay(this.gameOverMsg);
            } else {
                this.changeActivePlayer();
                //e isso tambem
                //      displayController.updMsgDisplay('turn');
            }

            return true;
        }

        else { return 'Invalid coordinates selected!'; }

    }

    checkGameOver() {
        const p1Lost = this.player1.playerBoard.checkIfAllShipsSunk();
        const p2Lost = this.player2.playerBoard.checkIfAllShipsSunk();
        this.gameOverMsg = false;

        if (p1Lost || p2Lost) {
            this.gameOVerFlag = true;
            this.gameOverMsg = `Game Over! ${this.getActivePlayer().name} wins!`;
            return true;
        }

        else { return false; }
    }


    turnOffGameOverFlag() {
        this.gameOVerFlag = false;
    }

    cpuAttacksRandom() {
        let x;
        let y;
        while (!this.getOpponent().playerBoard.validadeCoordinate([x, y])) {
            x = Math.floor(Math.random() * 10) + 1;
            y = Math.floor(Math.random() * 10) + 1;
        }
        this.selectSpace([x, y]);
    }

    TESTcpuAttacksBattleship() {
        let x = 1;
        let y = 1;
        while (!this.getOpponent().playerBoard.validadeCoordinate([x, y])) {
            y++;
        }
        this.selectSpace([x, y]);
    }

    readLogs() {
        const active = this.getActivePlayer();
        const opponent = this.getOpponent();
        const you = {
            name: active.name,
            coord: active.attackLog.getLastAttackCoordinate(),
            outcome: active.attackLog.getLastAttackOutcome(),
        }
        const opp = {
            name: opponent.name,
            coord: opponent.attackLog.getLastAttackCoordinate(),
            outcome: opponent.attackLog.getLastAttackOutcome(),
        }
        let attacked;
        if (you.coord && opp.coord) { attacked = 'both'; }
        else if (!you.coord && opp.coord) { attacked = 'opp'; }
        else { attacked = 'none'; }

        return { you, opp, attacked };
    }
}