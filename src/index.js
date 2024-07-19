import { Ship, GameBoard, Player, GameFlow } from './classes.js';
import { DisplayController } from './DOMstuff.js';
import './style.css';

const display = new DisplayController();
const flow = new GameFlow();
flow.player1.playerBoard.placeShip(flow.player1.playerBoard.ships.battleship, [1, 1], false);
flow.player1.playerBoard.placeShip(flow.player1.playerBoard.ships.carrier, [8, 4], false);
flow.player1.playerBoard.placeShip(flow.player1.playerBoard.ships.destroyer, [2, 10], true);
flow.player1.playerBoard.placeShip(flow.player1.playerBoard.ships.patrol, [9, 9], false);
flow.player1.playerBoard.placeShip(flow.player1.playerBoard.ships.submarine, [3, 3], false);

flow.player2.playerBoard.placeShip(flow.player2.playerBoard.ships.battleship, [1, 1], false);
flow.player2.playerBoard.placeShip(flow.player2.playerBoard.ships.carrier, [8, 4], false);
flow.player2.playerBoard.placeShip(flow.player2.playerBoard.ships.destroyer, [2, 10], true);
flow.player2.playerBoard.placeShip(flow.player2.playerBoard.ships.patrol, [9, 9], false);
flow.player2.playerBoard.placeShip(flow.player2.playerBoard.ships.submarine, [3, 3], false);

console.log(flow);

display.initializeGrid(document.querySelector('.player-board'));
display.initializeGrid(document.querySelector('.opp-board'));

flow.player2.playerBoard.receiveAttack([1,1]);
flow.player2.playerBoard.receiveAttack([10,10]);
flow.player2.playerBoard.receiveAttack([1,2]);
flow.player2.playerBoard.receiveAttack([3,4]);

flow.player1.playerBoard.receiveAttack([1,3]);
flow.player1.playerBoard.receiveAttack([10,4]);
flow.player1.playerBoard.receiveAttack([5,9]);
flow.player1.playerBoard.receiveAttack([4,4]);

display.renderPlayerBoard(flow.player1);
display.renderOpponentBoard(flow.player2);


