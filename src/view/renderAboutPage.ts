export function renderAboutPage(container: HTMLElement): void {
  const aboutUs = document.createElement("h1");
  aboutUs.className = "main__about";
  aboutUs.textContent = "О проекте";

  const projectDescription = document.createElement("p");
  projectDescription.className = "about__description";
  projectDescription.textContent =
    "Командный магазин игрушек. В каталоге доступны поиск по названию, фильтры по категории и цене, сортировка и добавление товаров в корзину. В корзине можно менять количество товаров, а её содержимое сохраняется в браузере.";

  const teamHeading = document.createElement("h2");
  teamHeading.className = "about__team-title";
  teamHeading.textContent = "Участники команды";

  const team = document.createElement("section");
  team.className = "about__team";
  team.setAttribute("aria-label", "Участники команды и их вклад");

  const arturContribution = document.createElement("p");
  arturContribution.className = "about__contribution";
  arturContribution.textContent =
    "Артур(ArtiNabiullin) — настройка основы проекта, каталог товаров, поиск, фильтрация, сортировка и тесты каталога.";

  const alikContribution = document.createElement("p");
  alikContribution.className = "about__contribution";
  alikContribution.textContent =
    "Алик(Oardieldei) — логика корзины, сохранение её состояния в localStorage, отображение товаров, управление количеством и расчёт общей стоимости.";

  const teamButton = document.createElement("button");
  teamButton.className = "about__button";
  teamButton.type = "button";
  teamButton.textContent = "Перейти в каталог";

  teamButton.addEventListener("click", () => {
    window.location.hash = "#catalog";
  });

  team.append(arturContribution, alikContribution);
  container.replaceChildren(
    aboutUs,
    projectDescription,
    teamHeading,
    team,
    teamButton,
  );
}
