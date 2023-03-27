import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 1000;

const inputEl = document.querySelector('input#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onNameInput, DEBOUNCE_DELAY));

function onNameInput(event) {
  const countryName = event.target.value.trim();
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';
  if (countryName === '') {
    return;
  }
  fetchCountries(countryName).then(response => {
    console.log('Знайдено часткових співпадінь:', response.length);
    if (response.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (response.length > 1 && response.length <= 10) {
      renderSearchList(response);
    } else if (response.length === 1) {
      renderCountryCard(response);
    }
  });
}

function renderSearchList(countries) {
  const markupList = countries
    .map(({ name, flags }) => {
      return `
            <li class="country-item">
            <img src="${flags.svg}" alt="${flags.alt} width="40" height="20""><h3>${name.official}</h3>
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
        <h2><img src="${flags.svg}" alt="${
        flags.alt
      } width="40" height="20""> ${name.official}</h2>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>
        </div>
        `;
    })
    .join('');
  countryInfoEl.innerHTML = markupCard;
}
