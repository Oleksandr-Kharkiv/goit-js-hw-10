import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 3000;

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
      .map(({capital, population, languages}) => {
        return `
            <p><b>Capital:</b> ${capital}</p>
            <p><b>Population:</b> ${population}</p>
            <p><b>Languages:</b> ${Object.values(languages)}</p>
            `;
      })
      .join("");
      countryInfoEl.innerHTML = markup;
  }
