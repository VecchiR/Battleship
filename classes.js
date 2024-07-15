class Ship {
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

class GameBoard {
    constructor() {
        this.board = this.createBoard();
        this.ships = {
            carrier : new Ship('carrier'),
            battleship : new Ship('battleship'),
            destroyer : new Ship('destroyer'),
            submarine : new Ship('submarine'),
            patrol  : new Ship('patrol boat')
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
        let spaceContent = this.board[x -1 ][y -1];
        if(spaceContent === '') {
            return 'miss';    
        }
        else {
            return this.getShipFromBoardMarker(spaceContent).hit();
        };
    }

}

class Player {
    constructor(type = 'human') {
        this.type = type;
        this.gameBoard = new GameBoard();
    }
}




const modExp = {
    Ship,
    GameBoard,
    Player
};


module.exports = modExp;