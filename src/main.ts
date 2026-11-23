import { renderLayout } from "./renderLayout";

const appRoot = document.getElementById('app');

if (!appRoot) {
  throw new Error('Не найден корневой элемент #app');
}

const pageContent = renderLayout(appRoot);