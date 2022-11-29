// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

async function run(){
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);
  updateMap(locations);
  setTimeout(run, 3000);
 }

async function getBusLocations(){
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}


// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoianBoYW5pNjciLCJhIjoiY2xhZmF1a3ViMDFtcjN2bW90M3lseGEzNyJ9.D2fsckzQkbYTSUYI1psRhw';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 12,
});

// counter here represents the index of the current bus stop
function updateMap(locations) {
  for (let counter = 0; counter<locations.length; counter++)
   {
   let long = locations[counter].attributes.longitude;
   let lat = locations[counter].attributes.latitude;
   let marker = new mapboxgl.Marker()
   .setLngLat([long,lat])
   .addTo(map);
   }
}

// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { move };
}
