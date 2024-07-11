class Ship {
    constructor(type) {
        this.length = this.getLength(type);
        this.hits = 0;
        this.sunk = false;
        this.type = type;
        this.boardMarker = this.getBoardMarker(type);
    }

    hit() {
        this.hits++;
        this.isSunk() ? this.sunk = true : null;
    }

    isSunk() {
        return !(this.length - this.hits > 0);
    }

    getLength(type) {
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

    getBoardMarker(type) {
        return type.at(0).toUpperCase();
    }
}

class GameBoard {
    constructor() {
        this.board = this.resetBoard();
    }

    resetBoard() {
        let reboard = new Array(10);
        for (let i = 0; i < 10; i++) {
            reboard[i] = new Array(10);
        }
        return reboard;
    }

    placeShip(ship, [x, y], verticalOrientation = false) {
        
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