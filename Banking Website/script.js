'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const headerElement = document.querySelector('.header');
const message = document.createElement('div');
//modal functionalities

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

//implementation of smooth scrolling for learn more button

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

//working on page navigations

/* document.querySelectorAll('.nav__link').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const id = el.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
}); */

//event delegation
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//working on event bubbling

/* const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('navlink', e.target, e.currentTarget);
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('links', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('nav', e.target, e.currentTarget);
  },
  false
);
 */
//experiments during learning

message.classList.add('cookie-message');
message.innerHTML =
  'We use cookie for improved functionaliy <button class="btn btn--close-cookie">Got it!</button>';
headerElement.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

message.style.backgroundColor = '#37383d';
