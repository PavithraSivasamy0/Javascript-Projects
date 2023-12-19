'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const renderCountry = (data, isNeighbour = '') => {
  console.log('renderCountry');
  const [languages] = Object.values(data.languages);
  const [currency] = Object.values(data.currencies);
  const html = `
  <article class="country ${isNeighbour}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
      <p class="country__row"><span>💰</span>${currency.name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getJsonData = (url, errorMrg = 'Something went wrong') => {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMrg} ${response.status}`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  // const request = new XMLHttpRequest();
  // request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  // request.send();
  getJsonData(
    `https://restcountries.com/v3.1/name/${country}`,
    'country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      console.log(data);
      let neighbors = data[0].borders[0];
      console.log(neighbors);
      if (!neighbors) throw new Error('neighbors not found');
      return getJsonData(
        `https://restcountries.com/v3.1/alpha/${neighbors}`,
        'neighbor not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });

  // const [neighbors] = data.borders;
  // const request2 = new XMLHttpRequest();
  // request2.open('GET', ``);
  // request2.send();
  // request2.addEventListener('load', function () {
  //   const [data] = JSON.parse(this.responseText);
  //   renderCountry(data);
  // });
  //});
};

// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(
          `problem with loading ${response.status} ${response.message}`
        );
      return response.json();
    })
    .then(data => {
      if (!data.countryName) return;
      console.log(data.countryName);
      return getCountryData(data.countryName);
    })
    .catch(err => console.error(`${err.message}💥`));
};

//whereAmI(52.508, 13.381);

const promise = new Promise((resolve, reject) => {
  console.log('test1');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('test2');
    } else {
      reject(new Error('test 3 failed'));
    }
  });
});

//promise.then(res => console.log(res)).catch(err => console.error(err));

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 sec');
    return wait(10);
  })
  .then(() => console.log('I waited for 1 sec'))
  .catch(err => console.error(err));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI2 = function () {
  getPosition()
    .then(position => {
      const { latitude: lat, longitude: lng } = position.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(
          `problem with loading ${response.status} ${response.message}`
        );
      return response.json();
    })
    .then(data => {
      if (!data.countryName) return;
      console.log(data.countryName);
      return getCountryData(data.countryName);
    })
    .catch(err => console.error(`${err.message}💥`));
};

//btn.addEventListener('click', whereAmI2);

//coding challenge - 2
const imgContainer = document.querySelector('.images');
const createImage = imgPath => {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement('img');
    newImg.src = imgPath;
    newImg.addEventListener('load', () => {
      imgContainer.append(newImg);
      resolve(newImg);
    });
    newImg.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

let imgEl;
createImage('img/img-1.jpg')
  .then(res => {
    imgEl = res;
    return wait(2);
  })
  .then(() => {
    imgEl.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(res => {
    imgEl = res;
    return wait(2);
  })
  .then(() => {
    imgEl.style.display = 'none';
  })
  .catch(err => console.error(err));

// rewriting the logics of promisyfying using async/await

const whereAmIAsync = async function () {
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  const responseGeo = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );
  const dataGeo = await responseGeo.json();
  console.log(dataGeo.countryName);
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.countryName}`
  );
  const data = await response.json();
  await renderCountry(data[0]);
  console.log(data);
};

//whereAmIAsync();

const get3Countries = async (c1, c2, c3) => {
  try {
    const [data] = Promise.all([
      getJsonData(`https://restcountries.com/v3.1/name/${c1}`),
      getJsonData(`https://restcountries.com/v3.1/name/${c2}`),
      getJsonData(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

//get3Countries('portugal', 'India', 'usa');

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgEl = await promise.all(imgs);
    console.log(imgEl);
    imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.log(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
