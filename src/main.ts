import { initFetchItem } from "./initFetchItem";
import { renderAboutPage } from "./view/renderAboutPage";
import { renderCatalogPage } from "./view/renderCatalogPage";
import { renderLayout } from "./view/renderLayout";
import type { Item } from "./fetchItems";

const appRoot = document.getElementById("app");

if (!appRoot) {
  throw new Error("Не найден корневой элемент #app");
}

const pageContent = renderLayout(appRoot);
let cachedItems: Item[] | null = null;

async function showCatalog(): Promise<void> {
  pageContent.textContent = "Загружаем каталог...";

  try {
    cachedItems ??= await initFetchItem();

    if (location.hash !== "#catalog") {
      return;
    }

    renderCatalogPage(pageContent, cachedItems);
  } catch (error) {
    console.error("Не удалось загрузить каталог", error);

    if (location.hash === "#catalog") {
      pageContent.textContent =
        "Не удалось загрузить каталог. Попробуйте обновить страницу.";
    }
  }
}

function renderRoute(): void {
  if (location.hash === "#catalog") {
    void showCatalog();
    return;
  }

  if (location.hash === "#cart") {
    pageContent.textContent = "";
  }

  renderAboutPage(pageContent);
}

window.addEventListener("hashchange", renderRoute);
renderRoute();
