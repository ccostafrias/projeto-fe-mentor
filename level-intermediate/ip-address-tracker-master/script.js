//Submit button events

const searchInput = document.querySelector('.search-input')
const form = document.querySelector('.search-wrapper')

form.addEventListener('submit', submitSearch)

function submitSearch(e){
    e.preventDefault()
    if (!searchInput.value) return
    getLocal(searchInput.value)
}

//Função para pegar o local

const key = 'at_qSpJ1bQxGMTTf5P1VqNDBhCFfmkIz'
const apiUrl = 'https://geo.ipify.org/api/'
const version = 'v2/'
const address = new Object

function getLocal(ip){
    const endpoint = `${apiUrl}${version}country,city?apiKey=${key}&ipAddress=${ip}&domain=${ip}`
    
    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => {
            Object.assign(address, data)
            setLocal()
        })
        .catch(error => alert(`Check if it's a valid IP address or turn off your adblock.`))
}

function setLocal(){
    const infoBox = document.querySelector('.local-info')

    infoBox.querySelector('.address p').textContent = address.ip
    infoBox.querySelector('.location p').textContent = `${address.location.city}, ${address.location.region} ${address.location.postalCode}`
    infoBox.querySelector('.timezone p').textContent = `UTC ${address.location.timezone}`
    infoBox.querySelector('.isp p').textContent = `${address.isp}`

    setMap(address.location.lat, address.location.lng)
}

//Map

const map = L.map('map', {
    'center': [0, 0],
    'layers': [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
    ]
})

const icon = L.icon({
    iconUrl: './images/icon-location.svg',

    iconSize:     [46, 55], // size of the icon
    iconAnchor:   [23, 55], // point of the icon which will correspond to marker's location
});

function setMap(lat=51.505, lng=-0.09){
    map.setView([lat, lng], 15);   
    L.marker([lat, lng], {icon: icon}).addTo(map)
}

setMap()