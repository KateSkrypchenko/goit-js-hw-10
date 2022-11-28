import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

// import {} from './fetchCountries';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

function input(event) {
  // console.log(event.target.value);
  const nameCountries = event.target.value.trim();
  if (nameCountries === '') {
    return (refs.div.innerHTML = '');
  }
  fetchCountriesByName(nameCountries).then(renderCountryCard).catch(reject);
}

refs.input.addEventListener('input', debounce(input, DEBOUNCE_DELAY));

// Notify.info('Too many matches found. Please enter a more specific name.');
// Notify.failure('Oops, there is no country with that name');

// fetchCountries(name);

// fetch('https://restcountries.com/v3.1/name/{name}');

// https://restcountries.com/v3.1/name/{name}

// _.debounce(callback, DEBOUNCE_DELAY);

// У першому методі then() виконується перевірка статусу відповіді і перетворення даних у правильний формат, або явне створення помилки, щоб обробити невдалий HTTP-запит в блоці catch().

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Data handling
//   })
//   .catch(error => {
//     // Error handling
//   });

// ЦІКАВО
// Це необхідно для того, щоб fetch() правильно зреагував на статус код 404, який, технічно, не є помилкою, але для клієнта - це неуспішний результат.

// function fetchUsers() {
//   return fetch('https://restcountries.com/v3.1/name/{name}').then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function renderUserList(contries) {
//   const markup = contries
//     .map(contry => {
//       return `<li>
//           <p><b>Name</b>: ${contry.name.official}</p>
//           <p><b>Capital</b>: ${contry.capital}</p>
//           <p><b>Population</b>: ${contry.population}</p>
//           <p><b>Flags</b>: ${contry.flags.svg}</p>
//           <p><b>Languages</b>: ${contry.languages}</p>
//         </li>`;
//     })
//     .join('');
//   refs.div.innerHTML = markup;
// }

// Тобі потрібні тільки наступні властивості:

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

// https://restcountries.com/v3.1/name/{name}

// const r = fetch('https://restcountries.com/v3.1/name/peru');
// console.log(r);

function fetchCountriesByName(searchName) {
  // const url = `https://restcountries.com/v3.1/name/${searchName}?fields=name,capital,languages,population,flags`;
  const url = `https://restcountries.com/v2/name/${searchName}?fields=name,capital,languages,population,flags`;
  console.log(fetch(url).then(response => response.json()));
  return fetch(url).then(response => response.json());
}

function renderCountryCard(countries) {
  const markup = countries
    .map(country => {
      return `<div class="box"><img class="flag" src="${country.flags.png}" alt=""></img>
              <h2>${country.name}</h2></div>
              <p><span>Capital</span>: ${country.capital}</p>
              <p><span>Population</span>: ${country.population}</p>
              <p><span>Languages</span>: ${country.languages[0].name}</p>`;
    })
    .join('');
  refs.div.innerHTML = markup;
}

function reject() {
  Notify.failure('Oops, there is no country with that name');
}

// const ovj = {
//   languages: [
//     {
//       iso639_1: 'es',
//       iso639_2: 'spa',
//       name: 'Spanish',
//       nativeName: 'Español',
//     },
//   ],
// };

// console.log(ovj.languages.join(''));
