import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 1000;

const inputEl = document.querySelector('input#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onNameInput, DEBOUNCE_DELAY));
function onNameInput(event){
    const countryName = event.target.value.trim()
    fetchCountries(countryName)
    .then(renderCountryCard)
    .catch(error => console.log("Щось пішло не так"))
    console.log(countryName);
}
function renderCountryCard(countries) {
    const markup = countries
      .map(({name, flags, capital, population, languages}) => {
        return `
            <div class="country-card">
            <h2><img src="${flags.svg}" alt="${flags.alt} width="40" height="20""> ${name.official}</h2>
            <p><b>Capital:</b> ${capital}</p>
            <p><b>Population:</b> ${population}</p>
            <p><b>Languages:</b> ${Object.values(languages)}</p>
            </div>
            `
      })
      .join("");
      countryInfoEl.innerHTML = markup;
  }


