const enpoint = 'data.json'
const countries = []
const cardsTable = document.querySelector('.cards-table')
const cardTemplate = document.querySelector('.card, .template')
const selectRegions = document.getElementById('regions')
const selectOrder = document.getElementById('order')
const searchInput = document.getElementById('search')

//Set cards with countries

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

function startCountries(countriesTo = countries) {
  const [param, order] = selectOrder.value.split('/')

  if (selectRegions.value == '') {
    countriesTo = countries
  } else {
    countriesTo = countries.filter(country => country.region == selectRegions.options[selectRegions.selectedIndex].value)
  }

  const regex = new RegExp(searchInput.value, 'gi')

  if (searchInput.value !== '') {
    countriesTo = countriesTo.filter(country => {
      if (country.name.match(regex) !== null) return country
      if (country.capital && country.capital.match(regex) !== null) return country
    })
  }

  cardsTable.innerHTML = sortCountries(countriesTo, param, order)
    .map(country => {
      return `<div class='card'>
                <img class='flag' src='${country.flags.png}' alt="${country.name} flag">
                <div class='card-content'>
                    <h2 class='country-name'>${setHighlight(country.name)}</h2>
                    <div class='country-info'>
                        <p><span class='bolder'>Population: </span><span class='subject'>${country.population.toLocaleString()}</span></p>
                        <p><span class='bolder'>Region: </span><span class='subject'>${country.region}</span></p>
                        <p><span class='bolder'>Capital: </span><span class='subject'>${setHighlight(country.capital)}</span></p>
                    </div>
                </div>
              </div>`
    })
    .join('')

}

function setHighlight(name){
  if (searchInput.value == '' || name == undefined) return name

  const regex = new RegExp(searchInput.value, 'gi')
  return name.replace(regex, `<span class='highlight'>${name.match(regex)}</span>`)
}

function sortCountries(toSort, param = 'population', order = 1) {
  return toSort.sort((fcountry, scountry) => {
    if (fcountry[param] > scountry[param]) {
      return -1 * order
    } else {
      return 1 * order
    }
  })
}

selectRegions.addEventListener('input', startCountries)
selectOrder.addEventListener('input', startCountries)
searchInput.addEventListener('input', startCountries)

//Toggle scheme (light & dark)

const moonIcon = document.querySelector("#moon")
const toggleButton = document.querySelector('.bttn-tggl')

toggleButton.addEventListener('mouseup', schemeButton)
toggleButton.addEventListener('keyup', e => {
  if (document.activeElement == e.target) {
    if (e.code === 'Enter' || e.code === 'Space') {
      schemeButton()
    }
  }
})

function getScheme(scheme) {
  if (!scheme) {
    localStorage.setItem('scheme', 'light')
    return 'light'
  } else {
    return scheme
  }
}

const theme = {
  dark: {
    '--primary-color': 'var(--color-dark-blue)',
    '--secondary-color': 'var(--color-very-dark-blue)',
    '--font-color': 'var(--color-white)',
  },
  light: {
    '--primary-color': 'var(--color-white)',
    '--secondary-color': 'var(--color-very-light-gray)',
    '--font-color': 'var(--color-very-dark-blue-plus)'
  }
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener('change', e => {
    actualScheme = e.matches ? "dark" : "light";
    localStorage.setItem('scheme', actualScheme)
    setScheme(actualScheme)
  })


function setScheme(scheme) {
  moonIcon.setAttribute('name', scheme == 'dark' ? 'moon' : 'moon-outline')
  document.documentElement.style.setProperty(
    '--primary-color',
    theme[scheme]['--primary-color']
  );
  document.documentElement.style.setProperty(
    '--secondary-color',
    theme[scheme]['--secondary-color']
  );
  document.documentElement.style.setProperty(
    '--font-color',
    theme[scheme]['--font-color']
  );
}

function schemeButton() {
  if (actualScheme == 'light') {
    actualScheme = 'dark'
  } else {
    actualScheme = 'light'
  }
  localStorage.setItem('scheme', actualScheme)
  setScheme(actualScheme)
}

let actualScheme = getScheme(localStorage.getItem('scheme'))
setScheme(actualScheme)

const sections = [...document.getElementsByTagName('section')]
const countryWrapper = document.querySelector('.country-wrapper')

cardsTable.addEventListener('mouseup', e => {
  const cardSelected = e.target.closest('.card')
  if (cardSelected) {
    toggleSection()
    const countryName = cardSelected.querySelector('.country-name').textContent
    const countrySelected = countries.find(country => country.name == countryName)
    // console.table(countrySelected)

    countryWrapper.innerHTML =
      `<img src="${countrySelected.flags.png}" alt="${countrySelected.name} flag" class="country-flag">
    <div class="country-content">
        <h2>${countrySelected.name}</h2>
        <div class="country-stats-wrapper">
          <div class="country-stats">
              <p><span class='bolder'>Native Name: </span><span class='subject'>${countrySelected.altSpellings[1]}</span></p>
              <p><span class='bolder'>Population: </span><span class='subject'>${countrySelected.population.toLocaleString()}</span></p>
              <p><span class='bolder'>Region: </span><span class='subject'></span>${countrySelected.region}</p>
              <p><span class='bolder'>Sub Region: </span><span class='subject'>${countrySelected.subregion}</span></p>
              <p><span class='bolder'>Capital: </span><span class='subject'>${countrySelected.capital}</span></p>
          </div>
          <div class="country-stats">
              <p><span class='bolder'>Top Level Domain: </span><span class='subject'>${countrySelected.topLevelDomain[0]}</span></p>
              <p><span class='bolder'>Currencies: </span><span class='subject'>${countrySelected.currencies[0].name}</span></p>
              <p><span class='bolder'>Languages: </span><span class='subject'>${countrySelected.languages[0].name}</span></p>
          </div>
        </div>
        <div class="country-borders">
        </div>
    </div>`

    countryWrapper.querySelector('.country-borders').innerHTML = countrySelected.borders.map(border => {
      return `<span class="country-border">${countries.find(country => country.alpha3Code == border).name}</span>`
    }).join('')
  }
})

const bttnBack = document.querySelector('.bttn-back-section')
bttnBack.addEventListener('click', toggleSection)

function toggleSection() {
  document.querySelector('.all-cards-sec').style.display = 'inline-block'
  document.querySelector('.country-card').style.display = 'flex'
  document.querySelector('.country-card').style.marginTop = `${actualScroll}px`
  window.scroll(0, actualScroll)
  setTimeout(() => {
    sections.forEach(section => {
      section.classList.toggle('active')
    })
  }, 10);
}

let actualScroll = window.scrollY

sections.forEach(section => {
  section.addEventListener('transitionend', e => {
    if (e.target === section) {
      if (section.classList.contains('active')) {
        document.querySelector('.all-cards-sec').style.display = 'none'
        document.querySelector('.country-card').style.marginTop = `0px`
        window.scroll(0, 0)
      } else {
        document.querySelector('.country-card').style.display = 'none'
      }
    }
  })
})

window.addEventListener('scroll', e => {
  if (document.querySelector('.all-cards-sec').style.display == 'none') return
  actualScroll = window.scrollY
  document.querySelector('.country-card').style.marginTop = `${actualScroll}px`
})