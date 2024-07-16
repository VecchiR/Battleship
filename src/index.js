import {Ship, GameBoard, Player} from './classes.js';
import {createGrid, initializeGrid} from './DOMstuff.js';
import './style.css';


initializeGrid(document.querySelector('.player-board'));
initializeGrid(document.querySelector('.opp-board'));
