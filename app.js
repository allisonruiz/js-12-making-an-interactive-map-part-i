//map object
const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},
    
    //build leaflet map

    buildMap() {
    this.map = L.map('map', {
    center: this.coordinates,
    zoom: 12,
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15',
    }).addTo(this.map)

    //create geolocation marker
    const marker = L.marker(this.coordinates)
    marker
    .addTo(this.map)
    .bindPopUp('<p1><b> You are here</b></p1>')
    .openPopUp()
},
//add business markers
addMarkers () {
    for (var i = 0; i < this.businesses.length; i++) {
        this.markers = L.marker([
            this.businesses[i].lat,
            this.businesses[i].long,
        ])
        .bindPopUp(`<p1>${this.businesses[i].name}</p1>`)
        .addTo(this.map)
        }
    },

}
//get coordinates via geolocation api

async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    return [pos.coords.latitude, pos.coords.longitude]
}

//get foursquare businesses
async function getFoursquare(business) {
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'pk.eyJ1IjoiYWxsaWNvZGVzIiwiYSI6ImNsMmp2amU1MzBnbTEzaW84YjV3a25hMmIifQ.1M4R3j1H2_d3LYVktpflrg'
        }
      };
      
      fetch('https://api.foursquare.com/v3/places/search?query=restaurants%2C%20coffee%2C%20hotels%2C%20gyms&radius=25&categories=restaurants%2C%20coffee%2C%20hotels%2C%20gyms&sort=DISTANCE', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    let limit = 5
    let lat = myMap.coordinates[0]
    let long = myMap.coordinates[1]
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses = parsedData.results
    return businesses
}
//console.log(await getCoords()); 



      
//process foursquare array

//event handlers

//window load
window.onload = async () => {
    const coords = await getCoords()
    console.log(coords)
    const map = L.map('map').setView([coords[0], coords[1]], 13);
}                             



//business submit button