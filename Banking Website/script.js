'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const headerElement = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookie for improved functionaliy <button class="btn btn--close-cookie">Got it!</button>';
headerElement.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

message.style.backgroundColor = '#37383d';

//implementation of smooth scrolling for learn more button

const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
buttonScrollTo.addEventListener('click', () => {
  const scrollCoords = section1.getBoundingClientRect();
  // window.scrollTo(
  //   scrollCoords.left + window.pageXOffset,
  //   scrollCoords.top + window.pageYOffset
  // );
  // window.scrollTo({
  //   left: scrollCoords.left + window.pageXOffset,
  //   top: scrollCoords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //SUPPORT ONLY MODERN BROWSERS
  section1.scrollIntoView({ behavior: 'smooth' });
});
