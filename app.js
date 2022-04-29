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
//get coordinates vis geolocation api

async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    return [pos.coords.latitude, pos.coords.longitude]
}

//get foursquare businesses

//console.log(await getCoords()); 
window.onload = async () => {
    const coords = await getCoords()
    console.log(coords)
    const map = L.map('map').setView([coords[0], coords[1]], 13);
}                             



      
//process foursquare array

//event handlers

//window load

//business submit button