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

test.only('place ship on gameboard', () => {
    const ship = new classes.Ship('destroyer');
    board.placeShip(ship, [1,1]);

    expect(board.board[0]).toEqual(
        ['D','D','D','','','','','','','']
    );

});