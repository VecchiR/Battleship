const classes = require('./classes');

const board = new classes.GameBoard();
const p1 = new classes.Player();

test('properly create ship', () => {
    const ship = new classes.Ship(2);
    expect(ship).toEqual({
        length: 2,
        hits: 0,
        sunk: false
    });
    ship.hit();
    expect(ship).toEqual({
        length: 2,
        hits: 1,
        sunk: false
    })
    ship.hit();
    expect(ship).toEqual({
        length: 2,
        hits: 2,
        sunk: true
    })
});

test('properly construct gameboard AND reset it', () => {
    const b1 = new classes.GameBoard();
    expect(b1.board.length).toBe(10);
    expect(b1.board[0].length).toBe(10);
    expect(b1.board[9].length).toBe(10);
});
