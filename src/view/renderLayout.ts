export function renderLayout(root: HTMLElement) {
  const header = document.createElement("header");
  header.className = "header";

  const logoLink = document.createElement("a");
  logoLink.className = "header__logo";
  logoLink.href = "#about";

  const logoImage = document.createElement("img");
  logoImage.src = "/img/logo.jpg";
  logoImage.alt = "Team-store logo";
  logoImage.className = "logo__image";

  logoLink.append(logoImage);

  const nav = document.createElement("nav");
  nav.className = "navigation";
  nav.setAttribute("aria-label", "Основная навигация");

  const aboutLink = document.createElement("a");
  aboutLink.className = "navigation__link";
  aboutLink.href = "#about";
  aboutLink.textContent = "О нас";

  const catalogLink = document.createElement("a");
  catalogLink.className = "navigation__link";
  catalogLink.href = "#catalog";
  catalogLink.textContent = "Каталог";

  const cartLink = document.createElement("a");
  cartLink.className = "navigation__link";
  cartLink.href = "#cart";
  cartLink.textContent = "Корзина";

  nav.append(aboutLink, catalogLink, cartLink);
  header.append(logoLink, nav);

  const main = document.createElement("main");
  main.className = "main";

  const mainContainer = document.createElement("div");
  mainContainer.className = "main__container";

  const footer = document.createElement("footer");
  footer.className = "footer";

  const dataCreation = document.createElement("p");
  dataCreation.className = "footer__data";
  dataCreation.textContent = "2026";

  const githubLinks = document.createElement("div");
  githubLinks.className = "footer__links";

  const arturLink = document.createElement("a");
  arturLink.className = "footer__link";
  arturLink.textContent = "Artur";
  arturLink.href = "https://github.com/ArtiNabiullin";

  const alikLink = document.createElement("a");
  alikLink.className = "footer__link";
  alikLink.textContent = "Alik";
  alikLink.href = "https://github.com/Oardieldei";

  githubLinks.append(arturLink, alikLink);

  footer.append(dataCreation, githubLinks);

  main.append(mainContainer);
  root.append(header, main, footer);

  return mainContainer;
}
