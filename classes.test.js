const classes = require('./classes');

const board = new classes.GameBoard();
const p1 = new classes.Player();

test('properly create ship', () => {
    const ship = new classes.Ship('patrol boat');
    expect(ship).toEqual({
        boardMarker: 'P',
        length: 2,
        hits: 0,
        sunk: false,
        type: 'patrol boat'
    });

    ship.hit();
    expect(ship.sunk).toBe(false);
    expect(ship.hits).toBe(1);

    ship.hit();
    expect(ship.sunk).toBe(true);
    expect(ship.hits).toBe(2);
});

test('properly construct gameboard AND reset it', () => {
    const b1 = new classes.GameBoard();
    expect(b1.board.length).toBe(10);
    expect(b1.board[0].length).toBe(10);
    expect(b1.board[9].length).toBe(10);
});

test('properly construct gameboard AND reset it', () => {
    const b1 = new classes.GameBoard();
    expect(b1.board.length).toBe(10);
    expect(b1.board[0].length).toBe(10);
    expect(b1.board[9].length).toBe(10);
});

test('place ship on gameboard', () => {
    const ship1 = new classes.Ship('destroyer');
    board.placeShip(ship1, [4, 4]);

    expect(board.board[3]).toEqual(
        ['', '', '', 'D', 'D', 'D', '', '', '', '']
    );
    const ship2 = new classes.Ship('battleship');
    board.placeShip(ship2, [5, 5]);


    expect(board.board[4]).toEqual(
        ['', '', '', '', 'B', 'B', 'B', 'B', '', '']
    );

    board.resetBoard();

    expect(board.board[3]).toEqual(
        ['', '', '', '', '', '', '', '', '', '']
    );


    const ship3 = new classes.Ship('destroyer');
    board.placeShip(ship3, [5, 5], true);
    expect(board.board[4][4]).toEqual('D');
    expect(board.board[5][4]).toEqual('D');
    expect(board.board[6][4]).toEqual('D');


    const ship4 = new classes.Ship('battleship');
    expect(board.placeShip(ship4, [8, 8])).toEqual('Ship cannot be placed here!');
    expect(board.placeShip(ship4, [5, 5])).toEqual('Ship cannot be placed here!');
    expect(board.placeShip(ship4, [5, 4])).toEqual('Ship cannot be placed here!');
    expect(board.placeShip(ship4, [8, 1], true)).toEqual('Ship cannot be placed here!');

    board.placeShip(new classes.Ship('patrol boat'), [1, 1]);
    expect(board.board[0]).toEqual(['P', 'P', '', '', '', '', '', '', '', '']);

});

test('create player and its gameboard', () => {
    expect(p1.type).toEqual('human');
    expect(p1.gameBoard.board).toEqual([["", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""]]);
})

test('attack p1', () => {
    p1.gameBoard.placeShip(p1.gameBoard.ships.battleship,[1,1]);
    p1.gameBoard.receiveAttack([1,2]);
    expect(p1.gameBoard.ships.battleship.hits).toBe(1);
})