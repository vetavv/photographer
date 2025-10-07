// *************** BURGER MENU ***************

const burgerBtn = document.querySelector("#burgerBtn");
const menu = document.querySelector("#menu");
const menuList = menu.querySelector(".menu__list");
let scrollbarWidth = 0;

function openMenu() {
  menu.classList.add("open");
  document.documentElement.classList.add("no-scroll");
  document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
}

function closeMenu() {
  menu.classList.remove("open");
  document.documentElement.classList.remove("no-scroll");
  document.documentElement.style.paddingRight = `0px`;
}

burgerBtn.addEventListener("click", (e) => {
  const menu = e.target.previousElementSibling;
  if (menu.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuList.addEventListener("click", (e) => {
  if (e.target.matches(".menu__link")) {
    closeMenu();
  }
});

// *************** ACCORDIONS ***************

const faqList = document.querySelector(".faq__list");
const accordionItems = Array.from(faqList.querySelectorAll(".faq__item"));

function openAccordion(item) {
  const answerWrapper = item.querySelector(".faq__answer-wrapper");
  const answer = item.querySelector(".faq__answer");
  answerWrapper.style.height = `${answer.clientHeight}px`;
  item.classList.add("open");
}

function closeAccordion(item) {
  const answerWrapper = item.querySelector(".faq__answer-wrapper");
  answerWrapper.style.height = "0";
  item.classList.remove("open");
}

function closeAllAccordions() {
  accordionItems.forEach((item) => {
    closeAccordion(item);
  });
}

function initAccordion() {
  const indexOfOpenedAccordion = Number(
    localStorage.getItem("indexOfOpenedAccordion")
  );
  if (indexOfOpenedAccordion !== -1) {
    openAccordion(accordionItems[indexOfOpenedAccordion]);
  }
}

faqList.addEventListener("click", (e) => {
  if (e.target.matches(".faq__question")) {
    const item = e.target.closest(".faq__item");
    if (item.classList.contains("open")) {
      closeAccordion(item);
      localStorage.setItem("indexOfOpenedAccordion", -1);
    } else {
      closeAllAccordions();
      openAccordion(item);

      localStorage.setItem(
        "indexOfOpenedAccordion",
        accordionItems.indexOf(item)
      );
    }
  }
});

// *************** MODALS ***************

const bookBtns = document.querySelectorAll(".card__btn");
const modalBooking = document.querySelector("#modalBooking");
const modalCloseBtn = modalBooking.querySelector(".modal__close-btn");

function closeModal(modal) {
  modal.classList.remove("open");
  document.documentElement.classList.remove("no-scroll");
  document.documentElement.style.paddingRight = `0px`;
}

function openModal(modal) {
  modal.classList.add("open");
  document.documentElement.classList.add("no-scroll");
  document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
}

bookBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal(modalBooking);
  });
});

modalBooking.addEventListener("click", (e) => {
  if (!e.target.closest(".modal-content")) {
    closeModal(modalBooking);
  } else if (e.target.matches(".modal__close-btn")) {
    closeModal(modalBooking);
  }
});

// *************** SLIDER ***************

const sliderPortfolio = document.querySelector("#sliderPortfolio");
const sliderWidth = sliderPortfolio.scrollWidth;
const sliderLeftBtn = document.querySelector("#portfolioLeft");
const sliderRightBtn = document.querySelector("#portfolioRight");
let currentTimer = null;

function goRight(slider) {
  const i = setInterval(() => {
    slider.scrollLeft += 1;
    if (slider.scrollLeft === sliderWidth - slider.clientWidth) {
      clearInterval(i);
    }
  }, 5);
  return i;
}

function goLeft(slider) {
  const i = setInterval(() => {
    slider.scrollLeft -= 1;
    if (slider.scrollLeft === 0) {
      clearInterval(i);
    }
  }, 5);
  return i;
}

sliderLeftBtn.addEventListener("mouseenter", () => {
  currentTimer = goLeft(sliderPortfolio);
});

sliderLeftBtn.addEventListener("mouseleave", () => {
  clearInterval(currentTimer);
});

sliderRightBtn.addEventListener("mouseenter", () => {
  currentTimer = goRight(sliderPortfolio);
});

sliderRightBtn.addEventListener("mouseleave", () => {
  clearInterval(currentTimer);
});

// *************** GENERAL ***************

document.addEventListener("DOMContentLoaded", () => {
  sliderPortfolio.scrollLeft = (sliderWidth - sliderPortfolio.clientWidth) / 2;
  initAccordion();
  scrollbarWidth = getScrollBarWidth();
});

window.addEventListener("resize", () => {
  sliderPortfolio.scrollLeft = (sliderWidth - sliderPortfolio.clientWidth) / 2;
  initAccordion();

  const desktopWidth = window.matchMedia("(width >= 769px)");
  if (desktopWidth.matches) {
    closeMenu();
    scrollbarWidth = getScrollBarWidth();
  }
});

// Calc scrollbar width
// To prevent body shift when modals are open

function getScrollBarWidth() {
  var inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement("div");
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);

  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild(outer);

  return w1 - w2;
}
