import logoAsset from './asset/logo.png';
import './style.css';
import gameMaker from './gameBoard.js';

// wrapper div for the logo in header
const logoContainer = document.querySelector('.logoContainer');
const logo = document.createElement('img');
logoContainer.appendChild(logo);
logo.src = logoAsset;

// player and computer playing boards
const playerBoard = document.createElement('div');
playerBoard.setAttribute('id', 'playerBoard');
const computerBoard = document.createElement('div');
computerBoard.setAttribute('id', 'computerBoard');
playerBoard.classList.add('gameBoard');
computerBoard.classList.add('gameBoard');

// gameCanvas
const canvas = document.querySelector('.gameContainer');
canvas.append(playerBoard, computerBoard);

//Initializing game
game = new gameMaker(playerBoard, computerBoard);
