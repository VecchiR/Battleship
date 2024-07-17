import { Ship, GameFlow, GameBoard, Player } from "./classes.js";

const gameflow = new GameFlow();
const board = new GameBoard();
const p1 = new Player();

test('properly create ship', () => {
    const ship = new Ship('patrol boat');
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
    const b1 = new GameBoard();
    expect(b1.board.length).toBe(10);
    expect(b1.board[0].length).toBe(10);
    expect(b1.board[9].length).toBe(10);
});

test('properly construct gameboard AND reset it', () => {
    const b1 = new GameBoard();
    expect(b1.board.length).toBe(10);
    expect(b1.board[0].length).toBe(10);
    expect(b1.board[9].length).toBe(10);
});

test('place ship on gameboard', () => {
    const ship1 = new Ship('destroyer');
    board.placeShip(ship1, [4, 4]);

    expect(board.board[3]).toEqual(
        ['', '', '', 'D', 'D', 'D', '', '', '', '']
    );
    const ship2 = new Ship('battleship');
    board.placeShip(ship2, [5, 5]);


    expect(board.board[4]).toEqual(
        ['', '', '', '', 'B', 'B', 'B', 'B', '', '']
    );

    board.resetBoard();

    expect(board.board[3]).toEqual(
        ['', '', '', '', '', '', '', '', '', '']
    );


    const ship3 = new Ship('destroyer');
    board.placeShip(ship3, [5, 5], true);
    expect(board.board[4][4]).toEqual('D');
    expect(board.board[5][4]).toEqual('D');
    expect(board.board[6][4]).toEqual('D');


    const ship4 = new Ship('battleship');
    expect(board.placeShip(ship4, [8, 8])).toEqual('Ship cannot be placed here!');
    expect(board.placeShip(ship4, [5, 5])).toEqual('Ship cannot be placed here!');
    expect(board.placeShip(ship4, [5, 4])).toEqual('Ship cannot be placed here!');
    expect(board.placeShip(ship4, [8, 1], true)).toEqual('Ship cannot be placed here!');

    board.placeShip(new Ship('patrol boat'), [1, 1]);
    expect(board.board[0]).toEqual(['P', 'P', '', '', '', '', '', '', '', '']);

});

test('create player and its gameboard', () => {
    expect(p1.type).toEqual('human');
    expect(p1.playerBoard.board).toEqual([["", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""], 
    ["", "", "", "", "", "", "", "", "", ""]]);
})

test('see if checkIfAllShipsSunk returns the correct array', () => {
    const psunk = new Player();
    expect(psunk.playerBoard.checkIfAllShipsSunk()).toEqual(false);
    psunk.playerBoard.ships.battleship.sunk = true;
    psunk.playerBoard.ships.carrier.sunk = true;
    psunk.playerBoard.ships.patrol.sunk = true;
    psunk.playerBoard.ships.submarine.sunk = true;
    psunk.playerBoard.ships.destroyer.sunk = true;
    expect(psunk.playerBoard.checkIfAllShipsSunk()).toEqual(true);
})

test('test validateCoordinate to check if the coordinate can be attacked', () => {
    const pval = new Player();
    pval.playerBoard.placeShip(pval.playerBoard.ships.battleship,[1,1]);
    expect(pval.playerBoard.validadeCoordinate([1,1])).toBe(true);
    expect(pval.playerBoard.validadeCoordinate([0,1])).toBe(false);
    expect(pval.playerBoard.validadeCoordinate(['1',1])).toBe(false);
    pval.playerBoard.receiveAttack([1,1]);
    expect(pval.playerBoard.validadeCoordinate([1,1])).toBe(false);
})

test('test if player can be attacked and the ship records the attack', () => {
    const pattack = new Player();
    pattack.playerBoard.placeShip(pattack.playerBoard.ships.battleship,[1,1]);
    pattack.playerBoard.receiveAttack([1,2]);
    expect(pattack.playerBoard.ships.battleship.hits).toBe(1);
    expect(pattack.playerBoard.ships.battleship)
})

test('check if checkGameOver works', () => {
    const flow = new GameFlow();
    expect(flow.checkGameOver()).toBe(false);
    flow.player1.playerBoard.ships.battleship.sunk = true;
    flow.player1.playerBoard.ships.carrier.sunk = true;
    flow.player1.playerBoard.ships.patrol.sunk = true;
    flow.player1.playerBoard.ships.submarine.sunk = true;
    expect(flow.checkGameOver()).toBe(false);
    flow.player1.playerBoard.ships.destroyer.sunk = true;
    expect(flow.checkGameOver()).toBe(true);

})

test('check if selectSpace stops when invalid coordinates are selected', () => {
    const flow = new GameFlow();
    flow.playerTurn = 1;
    expect(flow.getActivePlayer().name).toBe('player1');
    flow.player1.playerBoard.placeShip(flow.player1.playerBoard.ships.battleship,[1,1]);
    flow.player2.playerBoard.placeShip(flow.player1.playerBoard.ships.battleship,[1,1]);
    expect(flow.selectSpace([1,1])).toBe(undefined);
    expect(flow.player2.playerBoard.ships.battleship.hits).toBe(1);
    expect(flow.getActivePlayer().name).toBe('player2');
    expect(flow.selectSpace([1,1])).toBe(undefined);
    expect(flow.player1.playerBoard.ships.battleship.hits).toBe(1);
    expect(flow.getActivePlayer().name).toBe('player1');
    expect(flow.selectSpace([1,1])).toBe('Invalid coordinates selected!');
    expect(flow.selectSpace([0,1])).toBe('Invalid coordinates selected!');
})