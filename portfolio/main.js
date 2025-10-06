// *************** BURGER MENU ***************

const burgerBtn = document.querySelector("#burgerBtn");
const menu = document.querySelector("#menu");
const menuList = menu.querySelector(".menu__list");

function toggleMenu() {
  menu.classList.toggle("open");
  document.documentElement.classList.toggle("no-scroll");
}

function closeMenu() {
  menu.classList.remove("open");
  document.documentElement.classList.remove("no-scroll");
}

burgerBtn.addEventListener("click", toggleMenu);
menuList.addEventListener("click", (e) => {
  if (e.target.matches(".menu__link")) {
    toggleMenu();
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
  openAccordion(accordionItems[indexOfOpenedAccordion]);
}

faqList.addEventListener("click", (e) => {
  if (e.target.matches(".faq__question")) {
    const item = e.target.closest(".faq__item");
    if (item.classList.contains("open")) {
      closeAccordion(item);
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
}

function openModal(modal) {
  modal.classList.add("open");
  document.documentElement.classList.add("no-scroll");
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

document.addEventListener("DOMContentLoaded", () => {
  sliderPortfolio.scrollLeft = (sliderWidth - sliderPortfolio.clientWidth) / 2;
  initAccordion();
});

window.addEventListener("resize", () => {
  sliderPortfolio.scrollLeft = (sliderWidth - sliderPortfolio.clientWidth) / 2;
  initAccordion();

  const desktopWidth = window.matchMedia("(width >= 769px)");
  if (desktopWidth.matches) {
    closeMenu();
  }
});
