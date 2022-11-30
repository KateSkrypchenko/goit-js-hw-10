import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountriesByName } from './fetchCountries';

console.log('dfdfsd');

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

function inputNameCountry(event) {
  const nameCountries = event.target.value.trim();
  updateDocument();
  if (!nameCountries) {
    return;
  }

  fetchCountriesByName(nameCountries).then(createCardList).catch(reject);
}

function updateDocument(mar1 = '', mar2 = '') {
  refs.div.innerHTML = mar1;
  refs.list.innerHTML = mar2;
}

function createCardList(arrCountries) {
  if (arrCountries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (arrCountries.length >= 2 && arrCountries.length <= 10) {
    const markup = renderCountriesList(arrCountries);
    updateDocument('', markup);
  } else {
    const markup = renderCountryCard(arrCountries);
    updateDocument(markup);
  }
}

function renderCountriesList(countries = []) {
  return (markup = countries
    .map(country => {
      return `<li>
      <div class="box"><img src="${country.flags.svg}" alt="flag ${country.name.common}" /><h2>${country.name.common}</h2></div>
    </li>`;
    })
    .join(''));
}

function renderCountryCard(countries = []) {
  return (markup = countries
    .map(country => {
      return `<div class="box"><img class="flag" src="${country.flags.svg}" alt="flag ${
        country.name.common
      }"></img>
              <h2>${country.name.official}</h2></div>
              <p><span>Capital</span>: ${country.capital}</p>
              <p><span>Population</span>: ${country.population}</p>
              <p><span>Languages</span>: ${Object.values(country.languages).join(', ')}</p>`;
    })
    .join(''));
}

function reject() {
  Notify.failure('Oops, there is no country with that name');
}

refs.input.addEventListener('input', debounce(inputNameCountry, DEBOUNCE_DELAY));
