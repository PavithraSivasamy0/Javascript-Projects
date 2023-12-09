'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const renderCountry = (data, isNeighbour = '') => {
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
      let neighbors = data[0].borders[0];
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

btn.addEventListener('click', function () {
  getCountryData('usa');
});
