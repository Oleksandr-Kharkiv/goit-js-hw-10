import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onNameInput, DEBOUNCE_DELAY));

function onNameInput(event) {
  event.preventDefault();
  const countryName = event.target.value.trim();
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';
  if (countryName === '') {
    return;
  }
  fetchCountries(countryName)
    .then(response => {
      console.log('Знайдено співпадінь:', response.length);
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.', {position: 'center-center'}
        );
      } else if (response.length > 1 && response.length <= 10) {
        renderSearchList(response);
      } else if (response.length === 1) {
        renderCountryCard(response);
      }
    })
    .catch(error => {
      if (error.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name', {position: 'center-center'});
        console.warn(`За вашим запитом країну не знайдено`);
      } else {
        console.log(`Виникла помилка при спробі запиту`);
      }
    });
}

function renderSearchList(countries) {
  const markupList = countries
    .map(({ name, flags }) => {
      return `
            <li class="country-item">
            <img src="${flags.svg}" alt="${flags.alt}" width="50"><h3>${name.official}</h3>
            </li>
            `;
    })
    .join('');
  countryListEl.innerHTML = markupList;
}

function renderCountryCard(countries) {
  const markupCard = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `
        <div class="country-card">
        <div class="tumb"><img src="${flags.svg}" alt="${
        flags.alt
      }" width="70"><h2 class="country-card__title"> ${name.official}</h2></div>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>
        </div>
        `;
    })
    .join('');
  countryInfoEl.innerHTML = markupCard;
}
