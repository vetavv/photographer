// *************** BURGER MENU ***************

const burgerBtn = document.querySelector("#burgerBtn");
const menu = document.querySelector("#menu");
const menuList = menu.querySelector(".menu__list");

function toggleMenu() {
  menu.classList.toggle("open");
  document.documentElement.classList.toggle("no-scroll");
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
const indexOfOpenAccordion = 0;

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

document.addEventListener("DOMContentLoaded", () => {
  const indexOfOpenedAccordion = Number(
    localStorage.getItem("indexOfOpenedAccordion")
  );
  openAccordion(accordionItems[indexOfOpenedAccordion]);
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
