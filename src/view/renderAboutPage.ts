export function renderAboutPage(container: HTMLElement): void {
  const aboutUs = document.createElement("h1");
  aboutUs.className = "main__about";
  aboutUs.textContent = "About us:";

  const contribution = document.createElement("div");
  contribution.className = "about__contribution";
  contribution.textContent = "About us:";

  container.replaceChildren(aboutUs, contribution);
}
