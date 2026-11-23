import { renderLayout } from "./renderLayout";

const appRoot = document.getElementById('app');

if (!appRoot) {
  throw new Error('Не найден корневой элемент #app');
}

const pageContent = renderLayout(appRoot);

const aboutUs = document.createElement('h1');
aboutUs.className = 'main-about';
aboutUs.textContent = 'About us:';

const contribution = document.createElement('div');
aboutUs.className = 'about__contribution';
aboutUs.textContent = 'About us:';

pageContent.append(aboutUs, contribution);