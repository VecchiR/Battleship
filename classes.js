class Ship {
    constructor(size) {
        this.length = size;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;
        this.isSunk() ? this.sunk = true : null;
    }

    isSunk() {
        return !(this.length - this.hits > 0);
    }
}

class GameBoard {
    constructor() {
        this.board = this.resetBoard();
    }

    resetBoard() {
        let reboard = new Array(10);
        for(let i = 0; i<10; i++) {
            reboard[i] = new Array(10);
        }
        return reboard;
    }

    writeOnBoard(x, y) {
        if (board[x][y] === '') {
            board[x][y] = gameflow.getActivePlayer().getMarker();
            return true;
        }

        else {
            displayController.updMsgDisplay('Space already taken! Choose another one');
            return false;
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