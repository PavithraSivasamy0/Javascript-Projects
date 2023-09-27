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

// DOM traversal - downwards
/* const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';

// DOM traversal - upwards
console.log(h1.parentElement);
console.log(h1.parentNode);
h1.closest('.header').style.background = 'var(--gradient-secondary)';

//DOM traversal - sideways siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children); */

//Implementing tab component
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', e => {
  const clickedTab = e.target.closest('.operations__tab');
  if (!clickedTab) return;
  tabs.forEach(el => {
    el.classList.remove('operations__tab--active');
  });
  clickedTab.classList.add('operations__tab--active');
  tabContents.forEach(el => {
    el.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

// nav menu fading implementation

const navMenuFadingHandler = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const clickedMenu = e.target;
    const siblings = clickedMenu.closest('.nav').querySelectorAll('.nav__link');
    const logo = clickedMenu.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(el => {
      if (el !== clickedMenu) {
        // el.style.opacity = opacity; only works for normal function but not for bind
        el.style.opacity = this;
      }
    });
    // logo.style.opacity = opacity;
    logo.style.opacity = this;
  }
};

const navLinkContainer = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');

// this will not work, bcs addEventListener always expects a function, but here it is a function
/* nav.addEventListener('mouseover', navMenuFadingHandler(0.5));
nav.addEventListener('mouseout', navMenuFadingHandler(1)); */

// way 1
/* nav.addEventListener('mouseover', function (e) {
  navMenuFadingHandler(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  navMenuFadingHandler(e, 1);
}); */

//way 2 using bind as bind always returns a copy of new function
nav.addEventListener('mouseover', navMenuFadingHandler.bind(0.5));
nav.addEventListener('mouseout', navMenuFadingHandler.bind(1));

//experiments during learning

/* message.classList.add('cookie-message');
message.innerHTML =
  'We use cookie for improved functionaliy <button class="btn btn--close-cookie">Got it!</button>';
headerElement.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

message.style.backgroundColor = '#37383d'; */
