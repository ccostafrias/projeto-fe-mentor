const enpoint = 'data.json'
const countries = []
const cardsTable = document.querySelector('.cards-table')
const cardTemplate = document.querySelector('.card, .template')
const selectRegions = document.getElementById('regions')
const searchInput = document.getElementById('search')

fetch(enpoint)
  .then(blob => blob.json())
  .then(data => countries.push(...data))

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.initiatorType === "fetch") {
      startCountries(countries)
    }
  }
});

observer.observe({
  entryTypes: ["resource"]
});

function startCountries(countriesTo) {
  cardsTable.innerHTML = ''
  const sortCountries = function (p = 'population', lm = 1) {
    return countriesTo.sort((fcountry, scountry) => {
      if (fcountry[p] > scountry[p]) {
        return -1*lm
      } else {
        return 1*lm
      }
    })
  }
  sortCountries().forEach(country => {
    let newCard = cardTemplate.cloneNode(true)
    newCard.querySelector('.flag').src = country.flags.png
    newCard.querySelector('h2').textContent = country.name
    newCard.querySelectorAll('.subject')[0].textContent = country.population.toLocaleString()
    newCard.querySelectorAll('.subject')[1].textContent = country.region
    newCard.querySelectorAll('.subject')[2].textContent = country.capital
    newCard.classList.remove('template')
    cardsTable.appendChild(newCard)
  });
}

selectRegions.addEventListener('input', () => {
  if (selectRegions.value == '') {
    startCountries(countries)
  } else {
    const filterRegion = countries.filter(country => country.region == selectRegions.options[selectRegions.selectedIndex].value)
    startCountries(filterRegion)
  }
})

searchInput.addEventListener('input', () => {
  const filterSearch = countries.filter(country => String(country.name).toLocaleLowerCase().includes(String(searchInput.value).toLocaleLowerCase()))
  startCountries(filterSearch)
})

