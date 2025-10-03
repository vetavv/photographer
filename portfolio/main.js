// *************** BURGER MENU ***************

const burgerBtn = document.querySelector("#burgerBtn");
const menu = document.querySelector("#menu");
const menuList = menu.querySelector(".menu__list");

function toggleMenu() {
  menu.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
}

burgerBtn.addEventListener("click", toggleMenu);
menuList.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu__link")) {
    toggleMenu();
  }
});
