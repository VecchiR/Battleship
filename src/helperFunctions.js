import { Ship, GameBoard, Player, GameFlow } from './classes.js';
import { DisplayController } from './DOMstuff.js';

export const displayControllerObj = new DisplayController();
export const gameFlowObj = new GameFlow();


export function initializeUI() {
    initializeMsgDisplay();
    initializeBoards();
    addEventListeners();
    changeTurn();
}

export function addEventListeners() {
    const allSquares = document.querySelectorAll('.opp-board > .cell');
    allSquares.forEach(sqr => {
        sqr.addEventListener('click', function () {
            sendAttackTo(sqr);
            changeTurn();
        });
    })
}

export function sendAttackTo(sqr) {
    const row = parseInt(sqr.getAttribute('row'));
    const col = parseInt(sqr.getAttribute('col'));
    console.log(row, col);
    gameFlowObj.selectSpace([row, col]);
}

export function initializeMsgDisplay() {
    displayControllerObj.msgDisplay = document.querySelector('.message-display');
}

export function initializeBoards() {
    displayControllerObj.initializeGrid(document.querySelector('.player-board'));
    displayControllerObj.initializeGrid(document.querySelector('.opp-board'));
}

export function placeShipsTEST() {
    gameFlowObj.player1.playerBoard.placeShip(gameFlowObj.player1.playerBoard.ships.battleship, [1, 1], false);
    // gameFlowObj.player1.playerBoard.placeShip(gameFlowObj.player1.playerBoard.ships.carrier, [8, 4], false);
    // gameFlowObj.player1.playerBoard.placeShip(gameFlowObj.player1.playerBoard.ships.destroyer, [2, 10], true);
    // gameFlowObj.player1.playerBoard.placeShip(gameFlowObj.player1.playerBoard.ships.patrol, [9, 9], false);
    // gameFlowObj.player1.playerBoard.placeShip(gameFlowObj.player1.playerBoard.ships.submarine, [3, 3], false);

    gameFlowObj.player2.playerBoard.placeShip(gameFlowObj.player2.playerBoard.ships.battleship, [4, 4], true);
    // gameFlowObj.player2.playerBoard.placeShip(gameFlowObj.player2.playerBoard.ships.carrier, [8, 4], false);
    // gameFlowObj.player2.playerBoard.placeShip(gameFlowObj.player2.playerBoard.ships.destroyer, [2, 10], true);
    // gameFlowObj.player2.playerBoard.placeShip(gameFlowObj.player2.playerBoard.ships.patrol, [9, 9], false);
    // gameFlowObj.player2.playerBoard.placeShip(gameFlowObj.player2.playerBoard.ships.submarine, [3, 3], false);

}

export function LotsOfAttacksTEST() {
    gameFlowObj.player2.playerBoard.receiveAttack([1, 1]);
    gameFlowObj.player2.playerBoard.receiveAttack([10, 10]);
    gameFlowObj.player2.playerBoard.receiveAttack([1, 2]);
    gameFlowObj.player2.playerBoard.receiveAttack([3, 4]);

    gameFlowObj.player1.playerBoard.receiveAttack([1, 3]);
    gameFlowObj.player1.playerBoard.receiveAttack([10, 4]);
    gameFlowObj.player1.playerBoard.receiveAttack([5, 9]);
    gameFlowObj.player1.playerBoard.receiveAttack([4, 4]);
}

export function changeTurn() {
    displayControllerObj.renderPlayerBoard(gameFlowObj.getActivePlayer());
    displayControllerObj.renderOpponentBoard(gameFlowObj.getOpponent());
    displayControllerObj.updMsgDisplay(gameFlowObj, 'turn');
}






