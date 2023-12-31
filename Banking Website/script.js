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

const navMenuFadingHandler = function (e, _opacity) {
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

//way 2 using bind as bind always returns a copy of function which gets called on
nav.addEventListener('mouseover', navMenuFadingHandler.bind(0.5));
nav.addEventListener('mouseout', navMenuFadingHandler.bind(1));

//implementing sticky nav bar using wuindows scroll events
/* const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
  if (this.window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}); */

// implementing stciky nav bar using intersection observer api
/* const obsObserverCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const observerOptions = {
  root: null,
  threshold: [0, 0.2],
};
const observer = new IntersectionObserver(obsObserverCallback, observerOptions);
observer.observe(section1); */
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(headerElement);

//revealing sections one by one
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//lazy loading of images
const images = document.querySelectorAll('img[data-src]');
const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
images.forEach(img => imgObserver.observe(img));

//implementing slider component

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  let curSlider = 0;
  const maxSlides = slides.length;
  const dotContainer = document.querySelector('.dots');

  //implementing dots
  const createDots = function () {
    slides.forEach(function (_, index) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = function (slide) {
    slides.forEach(
      (s, index) =>
        (s.style.transform = `translateX(${100 * (index - slide)}%)`)
    );
  };

  const moveNextSlide = function () {
    if (curSlider === maxSlides - 1) curSlider = 0;
    else curSlider++;
    goToSlide(curSlider);
    activateDot(curSlider);
  };

  const movePreviousSlide = function () {
    if (curSlider == 0) curSlider = maxSlides - 1;
    else curSlider--;
    goToSlide(curSlider);
    activateDot(curSlider);
  };
  const initFunction = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  initFunction();

  btnRight.addEventListener('click', moveNextSlide);
  btnLeft.addEventListener('click', movePreviousSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') movePreviousSlide();
    e.key === 'ArrowRight' && moveNextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
//experiments during learning

/* message.classList.add('cookie-message');
message.innerHTML =
  'We use cookie for improved functionaliy <button class="btn btn--close-cookie">Got it!</button>';
headerElement.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

message.style.backgroundColor = '#37383d'; */

//lifecycle of DOM
// document.addEventListener('DOMContentLoaded', () => {
//   console.log('something');
// });
// window.addEventListener('load', () => {
//   console.log('something-loaded');
// });
// window.addEventListener('beforeUnload', () => {
//   e.preventDefault();
//   console.log('e');
//   e.returnValue = 'message';
// });

//prototypal inheritence using constructor function
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed = this.speed + 10;
//   console.log(`${this.make} going at the speed of ${this.speed}km/hr`);
// };

// Car.prototype.brake = function () {
//   this.speed = this.speed - 5;
//   console.log(`${this.make} going at the speed of ${this.speed}km/hr`);
// };

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 90);

// car1.accelerate();
// car1.accelerate();
// car1.accelerate();
// car2.accelerate();
// car1.brake();
// car2.brake();

//prototypal inheritance using es6 classes
// class personCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed = this.speed + 10;
//     console.log(`${this.make} going at the speed of ${this.speed}km/hr`);
//   }
//   break() {
//     this.speed = this.speed - 5;
//     console.log(`${this.make} going at the speed of ${this.speed}km/hr`);
//   }

//   get speedUs() {
//     return this.speed / 1.6;
//   }

//   set speedUs(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const bmw = new personCl('bmw', 90);
// console.log(bmw.speedUs);
// bmw.accelerate();
// bmw.speedUs = 50;
// bmw.accelerate();

//inheritence using object.create()

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };
// Car.prototype.accelerate = function () {
//   this.speed = this.speed + 10;
//   console.log(`${this.make} going at the speed of ${this.speed}km/hr`);
// };
// Car.prototype.break = function () {
//   this.speed = this.speed - 5;
//   console.log(`${this.make} going at the speed of ${this.speed}km/hr`);
// };

// EV.prototype = Object.create(Car.prototype);
// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} is going at the speed of ${this.speed}km/hr with the charge of ${this.charge}`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(90);
// console.log(tesla);
// tesla.break();
// tesla.accelerate();

//inheritence using es6 classes
class carCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed = this.speed + 10;
    console.log(`${this.make} going at the speed of ${this.speed}km/hr`);
  }
  break() {
    this.speed = this.speed - 5;
    console.log(`${this.make} going at the speed of ${this.speed}km/hr`);
    return this;
  }
}

class EVCL extends carCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at the speed of ${
        this.speed
      }km/hr with the charge of ${this.#charge}`
    );
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}

const rivan = new EVCL('rivan', 120, 23);
rivan
  .accelerate()
  .accelerate()
  .accelerate()
  .break()
  .chargeBattery(50)
  .accelerate()
  .break()
  .chargeBattery();
