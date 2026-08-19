import logoAsset from './asset/logo.png';
import './style.css';
const logoContainer = document.querySelector('.logoContainer');
const logo = document.createElement('img');
logoContainer.appendChild(logo);
logo.src = logoAsset;
