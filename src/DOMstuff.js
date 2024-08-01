export class DisplayController {
    constructor() {
        this.msgDisplayLine1 = null;
        this.msgDisplayLine2 = null;

        this.leftBoard = document.querySelector('.player-board');
        this.rightBoard = document.querySelector('.opp-board');

        this.modal = null;
        this.modalContentH2 = null;
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


        const messageDisplayLine1 = document.createElement('span');
        messageDisplayLine1.classList.add('message-display');
        messageDisplayLine1.id = 'line1';
        gameContainer.appendChild(messageDisplayLine1);

        const messageDisplayLine2 = document.createElement('span');
        messageDisplayLine2.classList.add('message-display');
        messageDisplayLine2.id = 'line2';
        gameContainer.appendChild(messageDisplayLine2);


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
        this.msgDisplayLine1 = document.querySelector('#line1');
        this.msgDisplayLine2 = document.querySelector('#line2');
    }

    initializeBoards() {
        this.initializeGrid(document.querySelector('.player-board'));
        this.initializeGrid(document.querySelector('.opp-board'));
    }

    updMsgDisplay(gameflowObj, gameOver) {
        const atkLogs = gameflowObj.readLogs();
        console.log(atkLogs);
        if (!gameOver) {
            switch (atkLogs.attacked) {
                case 'both':
                    this.msgDisplayLine1.innerHTML = `Your last attack: [${atkLogs.you.coord}] 
                      was a <span id='outcome1' class='outcome'>${atkLogs.you.outcome}</span>`;

                    this.msgDisplayLine2.innerHTML = `${atkLogs.opp.name}'s last attack: 
                      [${atkLogs.opp.coord}] was a <span id='outcome2' class='outcome'> ${atkLogs.opp.outcome}</span>`;
                    break;

                case 'opp':
                    this.msgDisplayLine1.innerHTML = `You are under attack! Select a coordinate to fire back!`;
                    
                    this.msgDisplayLine2.innerHTML = `${atkLogs.opp.name}'s last attack: 
                     [${atkLogs.opp.coord}] was a <span id='outcome2' class='outcome'> ${atkLogs.opp.outcome}</span>`;

                    break;

                case 'none':
                    this.msgDisplayLine1.innerHTML = `${atkLogs.you.name}, it's time to start this battle!`;
                    this.msgDisplayLine2.innerHTML = `Select a coordinate to attack.`;
                    break;
            }

            this.styleMsgDisplayOutcomes(document.querySelector('#outcome1'), atkLogs.you.outcome,
                document.querySelector('#outcome2'), atkLogs.opp.outcome);
        }

        else {
            this.msgDisplayLine1.innerHTML = `${atkLogs.opp.name}'s fleet was destroyed`;
            this.msgDisplayLine2.innerHTML = `Congratulations, ${atkLogs.you.name}. The victory is yours!`;
        }
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

    renderBoards(player, opp) {
        this.renderPlayerBoard(player);
        this.renderOpponentBoard(opp);
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
        this.modalContentH2 = document.querySelector('.modal-content > h2');
    }

    showPassDeviceScreen() {
        this.modal.style.display = 'block';
    }

    hidePassDeviceScreen() {
        this.modal.style.display = 'none';
    }

    styleBoardsOutcomes(gameFlowObj) {
        try {
            this.stylePlayerBoardOutcomes(gameFlowObj);
        }
        catch {
            // return;
        }
        try {
            this.styleOpponentBoardOutcomes(gameFlowObj);
        }
        catch {

        }
    }

    stylePlayerBoardOutcomes(gameFlowObj) {
        const coordinates = gameFlowObj.getActivePlayer().attackLog.getLastAttackCoordinate();
        const outcome = gameFlowObj.getActivePlayer().attackLog.getLastAttackOutcome();
        const boardCell = document.querySelector(`.opp-board > .cell[row="${coordinates[0]}"][col="${coordinates[1]}"]`);
        boardCell.setAttribute('outcome', `${boardCell.textContent}`);
    }

    styleOpponentBoardOutcomes(gameFlowObj) {
        const coordinates = gameFlowObj.getOpponent().attackLog.getLastAttackCoordinate();
        const outcome = gameFlowObj.getOpponent().attackLog.getLastAttackOutcome();
        const boardCell = document.querySelector(`.player-board > .cell[row="${coordinates[0]}"][col="${coordinates[1]}"]`);
        boardCell.setAttribute('outcome', `${boardCell.textContent}`);
    }

    styleMsgDisplayOutcomes(playerSpan, playerOutcome, oppSpan, oppOutcome) {
        if (playerOutcome) { playerSpan.setAttribute('outcome', playerOutcome); }
        if (oppOutcome) { oppSpan.setAttribute('outcome', oppOutcome); }
    }


    //ADICIONAR UM BOTAO DE RESET NO FIM DA PARTIDA PRA COMEÇAR DE NOVO
    // resetScreen() {
    //     gameboard.resetBoard();
    //     gameflow.turnOffGameOverFlag();
    //     this.mainContainer.removeChild(this.gameContainer);
    //     this.mainContainer.appendChild(this.startContainer);
    // }


}
