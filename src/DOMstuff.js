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

    styleBoardsOutcomes(gameFlowObj, p2IsCpu, activePlayer, opponent) {
        this.removeAllOutcomeAttributesFromBoards();
        const player = p2IsCpu ? gameFlowObj.player1 : activePlayer;
        const opp = p2IsCpu ? gameFlowObj.player2 : opponent;
        try {
            this.stylePlayerBoardOutcomes(player);
        } catch { /* empty */ }
        try {
            this.styleOpponentBoardOutcomes(opp);
        } catch { /* empty */ }
    }

    removeAllOutcomeAttributesFromBoards() {
        const cells = document.querySelectorAll('.cell[outcome]');
        cells.forEach(cell => cell.removeAttribute('outcome'));
    }

    stylePlayerBoardOutcomes(player) {
        const attacks = player.attackLog.allAttacks;
        attacks.forEach(a => {
            const cell = document.querySelector(`.opp-board > .cell[row="${a[0][0]}"][col="${a[0][1]}"]`);
            cell.setAttribute('outcome', `${cell.textContent}`);
        });
    }

    styleOpponentBoardOutcomes(opp) {
        const attacks = opp.attackLog.allAttacks;
        attacks.forEach(a => {
            const cell = document.querySelector(`.player-board > .cell[row="${a[0][0]}"][col="${a[0][1]}"]`);
            cell.setAttribute('outcome', `${cell.textContent}`);
        });
    }

    styleMsgDisplayOutcomes(playerSpan, playerOutcome, oppSpan, oppOutcome) {
        if (playerOutcome) { playerSpan.setAttribute('outcome', playerOutcome); }
        if (oppOutcome) { oppSpan.setAttribute('outcome', oppOutcome); }
    }


    //ADICIONAR UM BOTAO DE RESET NO FIM DA PARTIDA PRA COMEÇAR DE NOVO
    addResetButton() {
        const resetBtn = document.createElement('button');
        resetBtn.classList.add('reset-button');
        resetBtn.textContent = 'RESET';
        const gameContainer = document.querySelector('.game-container');
        gameContainer.appendChild(resetBtn);
    }

    returnToInitialScreen() {
        const mainContainer = document.querySelector('.main-container');
        mainContainer.innerHTML = '';

        const startContainer = document.createElement('div');
        startContainer.classList.add('start-container');
        mainContainer.appendChild(startContainer);

        const player1Label = document.createElement('label');
        player1Label.setAttribute('for', 'player1');
        player1Label.innerHTML = '<span>P1:</span><input type="text" name="player1" id="player1" placeholder="Player 1">';
        startContainer.appendChild(player1Label);

        const player2Label = document.createElement('label');
        player2Label.setAttribute('for', 'player2');
        player2Label.innerHTML = '<span>P2:</span><input type="text" name="player2" id="player2" placeholder="CPU" disabled><select name="type" id="type"><option value="cpu">CPU</option><option value="human">HUM</option></select>';
        startContainer.appendChild(player2Label);

        const startButton = document.createElement('button');
        startButton.classList.add('start', 'btn');
        startButton.textContent = 'Start!';
        startContainer.appendChild(startButton);
    }

}
