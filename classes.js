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
        for (let i = 0; i < length; i++) {
            //if horizontal, i is added to y(columns), if vertical, i is added to x(rows)
            this.board 
            [x - 1 + i * verticalOrientation] 
            [y - 1 + i * !verticalOrientation] 
            = ship.getBoardMarker();
        }
    }
}

class Player {

}




const modExp = {
    Ship,
    GameBoard,
    Player
};

module.exports = modExp;