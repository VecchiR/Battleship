import { Ship, GameBoard, Player, GameFlow } from './classes.js';


export class DisplayController {
    constructor() {
        this.displayBoard = null;
        this.msgDisplay = null;
        this.resetButton = null;
        this.gameContainer = null;

        this.playerXName = document.querySelector('#playerx');
        this.playerOName = document.querySelector('#playero');

        this.startContainer = document.querySelector('.start-container');
        this.mainContainer = document.querySelector('.main-container');

        this.leftBoard = document.querySelector('.player-board');
        this.rightBoard = document.querySelector('.opp-board');

        this.modal = null;
    }


    initializeGameplayScreen() {

        const mainContainer = document.querySelector('.main-container');

        // Remove existing content except the main container
        while (mainContainer.firstChild) {
            mainContainer.removeChild(mainContainer.firstChild);
        }

        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container');
        mainContainer.appendChild(gameContainer);


        const messageDisplay = document.createElement('span');
        messageDisplay.classList.add('message-display');
        messageDisplay.textContent = 'message display :3';
        gameContainer.appendChild(messageDisplay);


        const playerBoard = document.createElement('div');
        playerBoard.classList.add('player-board');
        gameContainer.appendChild(playerBoard);
        this.leftBoard = document.querySelector('.player-board');


        const oppBoard = document.createElement('div');
        oppBoard.classList.add('opp-board');
        gameContainer.appendChild(oppBoard);
        this.rightBoard = document.querySelector('.opp-board');
    }




    initializeMsgDisplay() {
        this.msgDisplay = document.querySelector('.message-display');
    }

    initializeBoards() {
        this.initializeGrid(document.querySelector('.player-board'));
        this.initializeGrid(document.querySelector('.opp-board'));
    }

    resetScreen() {
        gameboard.resetBoard();
        gameflow.turnOffGameOverFlag();
        this.mainContainer.removeChild(this.gameContainer);
        this.mainContainer.appendChild(this.startContainer);
    }

    createBoard() {
        this.gameContainer = document.createElement('div');
        this.gameContainer.setAttribute('class', 'game-container');
        this.msgDisplay = document.createElement('span');
        this.msgDisplay.setAttribute('class', 'messages');
        this.resetButton = document.createElement('button');
        this.resetButton.setAttribute('class', 'reset');
        this.resetButton.innerHTML = 'Reset';
        this.resetButton.addEventListener('click', () => this.resetScreen());
        const board = document.createElement('div');
        board.setAttribute('class', 'board');
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                let space = document.createElement('div');
                space.setAttribute('class', 'space');
                space.setAttribute('spcx', x);
                space.setAttribute('spcy', y);
                space.addEventListener('click', () => gameflow.selectSpace(space.getAttribute('spcx'), space.getAttribute('spcy')));
                board.appendChild(space);
            }
        }
        this.gameContainer.appendChild(this.msgDisplay);
        this.gameContainer.appendChild(board);
        this.gameContainer.appendChild(this.resetButton);
        this.mainContainer.appendChild(this.gameContainer);
        this.displayBoard = document.querySelectorAll('.space');
        this.updMsgDisplay('turn');
    }

    updMsgDisplay(gameflowObj, arg) {
        if (arg === 'turn') {
            this.msgDisplay.innerHTML = `${gameflowObj.getActivePlayer().name}, it's your turn!`;
        } else {
            this.msgDisplay.innerHTML = arg;
        }
    }

    updDisplayBoard() {
        this.displayBoard.forEach(space => {
            space.textContent = gameboard.getBoard()[space.getAttribute('spcx')][space.getAttribute('spcy')];
        });
    }

    initializeGrid(gridContainer) {

        for (let row = 1; row <= 10; row++) {
            for (let col = 1; col <= 10; col++) {
                const sqrDiv = document.createElement('div');
                sqrDiv.setAttribute('row', row);
                sqrDiv.setAttribute('col', col);
                sqrDiv.className = 'cell';
                gridContainer.appendChild(sqrDiv);
            }
        }

    }


    renderPlayerBoard(player) {
        const board = player.playerBoard.board;

        // Loop through each row of the board
        board.forEach((row, rowIndex) => {
            // Loop through each cell in the row
            row.forEach((cellContent, cellIndex) => {
                const cell = this.leftBoard.children[rowIndex * 10 + cellIndex]; // Calculate cell index
                cell.textContent = cellContent; // Set the cell content
            });
        });
    }

    renderOpponentBoard(player) {
        const board = player.playerBoard.board;

        // Loop through each row of the board
        board.forEach((row, rowIndex) => {
            // Loop through each cell in the row
            row.forEach((cellContent, cellIndex) => {
                const cell = this.rightBoard.children[rowIndex * 10 + cellIndex]; // Calculate cell index
                if (cellContent === '' || cellContent === 'hit' || cellContent === 'miss') {
                    cell.textContent = cellContent; // Set the cell content
                }
                else { cell.textContent = ''; }
            });
        });
    }

    setupModal() {
        this.modal = document.querySelector('.modal');
        this.modal.addEventListener('click', () => {
            this.hidePassDeviceScreen();
        });
    }

    showPassDeviceScreen() {
        this.modal.style.display = 'block';
    }

    hidePassDeviceScreen() {
        this.modal.style.display = 'none';
    }

}
