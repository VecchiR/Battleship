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

}

class Player {
    
}



const modExp = {
    Ship,
    GameBoard,
    Player
};

module.exports = modExp;