export function renderLayout(root: HTMLElement) {
  const header = document.createElement('header');
  header.className = 'header';

  const main = document.createElement('main');
  main.className = 'main';

  const mainContainer = document.createElement('div');
  mainContainer.className = 'main-container';

  const footer = document.createElement('footer');
  footer.className = 'footer';

  main.append(mainContainer)
  root.append(header, main, footer);

  return mainContainer;
}