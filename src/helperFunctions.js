import { Ship, GameBoard, Player, GameFlow } from './classes.js';
import { DisplayController } from './DOMstuff.js';

export const displayControllerObj = new DisplayController();
export const gameFlowObj = new GameFlow();
export let type;


export function setupInitialScreen() {
    displayControllerObj.setupModal();
    addEventListenersToP2Selection();
    addEventListenerToStartButton();
}

export function startGame() {
    initializeUI();
    changeTurn();
}

export function addEventListenersToP2Selection() {
    const player2Input = document.getElementById('player2');
    const playerTypeSelect = document.getElementById('type');

    playerTypeSelect.addEventListener('change', function () {
        const selectedType = playerTypeSelect.value;
        if (selectedType === 'cpu') {
            player2Input.value = 'CPU';
            player2Input.disabled = true;
            player2Input.placeholder = 'CPU';
        } else {
            player2Input.value = '';
            player2Input.disabled = false;
            player2Input.placeholder = 'Player 2';
        }
    });
}

export function addEventListenerToStartButton() {
    const startButton = document.querySelector('.start');
    startButton.addEventListener('click', () => {
        setPlayers();
        placeShipsTEST();
        startGame();
    });
}

export function setPlayers() {
    let p1name = document.getElementById('player1').value;
    let p2name = document.getElementById('player2').value;
    const p2type = document.getElementById('type').value;

    p1name === '' ? p1name = 'Player 1' : null;
    if (p2type === 'cpu') { p2name = 'CPU'; }
    else if (p2name === '') { p2name = 'Player 2'; }

    gameFlowObj.setPlayers(p1name, p2name, p2type);
    type = gameFlowObj.player2.type;
}

export function initializeUI() {
    displayControllerObj.initializeGameplayScreen();
    displayControllerObj.initializeMsgDisplay();
    displayControllerObj.initializeBoards();
    addEventListenersToOppBoard();
}

export function addEventListenersToOppBoard() {
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
    const gameOverState = gameFlowObj.gameOVerFlag;
    if(gameFlowObj.playerTurn === 2 && type === 'cpu') {
        cpuPlays();
    }

    displayControllerObj.renderBoards(gameFlowObj.getActivePlayer(), gameFlowObj.getOpponent());
    displayControllerObj.styleBoardsOutcomes(gameFlowObj);

    displayControllerObj.updMsgDisplay(gameFlowObj, gameOverState);
    if (type === 'human' && gameOverState === false) {
        displayControllerObj.modalContentH2.textContent = `It's ${gameFlowObj.getActivePlayer().name}'s turn!`;
        displayControllerObj.showPassDeviceScreen();
    }
}


export function cpuPlays() {
    gameFlowObj.cpuAttacksRandom();
}












