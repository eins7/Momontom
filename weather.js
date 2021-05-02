const weather = document.querySelector(".js-weather");

const LS_COORDS = "coords";
const API_KEY = "cd5f253e4fbb4b20dd04efe37f5f6e14";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const city = json.name;
      weather.innerText = `${temp}˚\n${city} `;
    });
}

function handleGeoError() {
  console.log("Can't access to geo location");
}

function saveCoords(obj) {
  localStorage.setItem(LS_COORDS, JSON.stringify(obj));
}

function handleGeoSuccess(pos) {
  const latitude = pos.coords.latitude;
  const longitude = pos.coords.longitude;
  const objCoords = {
    latitude,
    longitude,
  };
  saveCoords(objCoords);
  getWeather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(LS_COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
