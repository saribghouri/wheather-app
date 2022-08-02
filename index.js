let appId = "71f6779186cc32448b4c412eea65b982";
let units = "metric";
let searchMethod; // q means searching as a string.

function getSearch(search) {
  if (search.length === 5 && Number.parseInt(search) + "" === search)
    searchMethod = "zip";
  else searchMethod = "q";
}

function searchWeather(search) {
  getSearch(search);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${search}&APPID=${appId}&units=${units}`
  )
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      init(res);
    });
}

function init(resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = "url('clearPicture.jpg')";
      break;

    case "Clouds":
      document.body.style.backgroundImage = "url('cloudyPicture.jpg')";
      break;

    case "Rain":
    case "Drizzle":
      document.body.style.backgroundImage = "url('rainPicture.jpg')";
      break;

    case "Mist":
      document.body.style.backgroundImage = "url('mistPicture.jpg')";
      break;

    case "Thunderstorm":
      document.body.style.backgroundImage = "url('stormPicture.jpg')";
      break;

    case "Snow":
      document.body.style.backgroundImage = "url('snowPicture.jpg')";
      break;

    default:
      break;
  }

  let weatherHeader = document.querySelector("#weatherDescriptionHeader");
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let cityHeader = document.querySelector("#cityHeader");

  let weatherIcon = document.querySelector("#documentIconImg");
  weatherIcon.src =
    "http://openweathermap.org/img/w/" +
    resultFromServer.weather[0].icon +
    ".png";

  let result = resultFromServer.weather[0].description;
  weatherHeader.innerText = result.charAt(0).toUpperCase() + result.slice(1);
  temperature.innerHTML = Math.floor(resultFromServer.main.temp) + "&#176;";
  windSpeed.innerHTML =
    "Wind Speed: " + Math.floor(resultFromServer.wind.speed) + " meter/s";
  cityHeader.innerHTML = resultFromServer.name;
  humidity.innerHTML =
    "Humidity levels: " + resultFromServer.main.humidity + "%";

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.querySelector("#weatherContainer");
  let ContainerHeight = weatherContainer.clientHeight;
  let ContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${ContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${ContainerHeight / 1.3}px)`;
  weatherContainer.style.visibility = "visible";
}

document.querySelector("#searchBtn").addEventListener("click", () => {
  let searchTerm = document.querySelector("#searchInput").value;
  if (searchTerm) searchWeather(searchTerm);
});
