const enpoint = 'data.json'
const countries = []
const main = document.getElementsByTagName('main')[0]

fetch(enpoint)
    .then(blob => blob.json())
    .then(data => countries.push(...data))

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.initiatorType === "fetch") {
      startCountries()
    }
  }
});

observer.observe({
  entryTypes: ["resource"]
});

function startCountries(){
    countries.forEach(country => {
        var newCountry = document.createElement('div')
        newCountry.textContent = 'Salve salve'
        main.appendChild(newCountry)
    });
}
