function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityName = document.querySelector("#city-name");
  cityName.textContent = `Currently in ${searchInput.value}`;
  submittedCityWeather(searchInput.value);
  let capitalizedCityName = searchInput.value
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  cityName.textContent = `Currently in ${capitalizedCityName}`;
  submittedCityWeather(searchInput.value);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", submitCity);

let defaultCity = "Pretoria";
submittedCityWeather(defaultCity);
function displayForecast(response) {
  let dailyForecast = response.data.daily.slice(0, 6); 
  let forecastElement = document.querySelector("#forecast");
  let currentDate = new Date();

  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach((forecastData, index) => {
    let forecastDate = new Date(currentDate);
    forecastDate.setDate(currentDate.getDate() + index);
    let iconCode = forecastData.weather[0].icon;
    let maxTemperature = Math.round(forecastData.temp.max);
    let minTemperature = Math.round(forecastData.temp.min);

    let day = "";
    if (index === 0) {
      day = "Today";
    } else {
      day = forecastDate.toLocaleString("en-us", { weekday: "short" });
    }

    forecastHTML += `
      <div class="col-2">
        <div class="weather-forecast-date">
          ${day}
        </div>
        <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon" width="42" />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${maxTemperature}°</span>
          <span class="weather-forecast-temperature-min">${minTemperature}°</span>
        </div>
      </div>`;
  });

  forecastHTML += `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
  
function getDailyForecast(coordinates){
  console.log (coordinates);
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=f8e6a9e3d6fde87cb38868da460b1371&units=metric`;
console.log (apiUrl);
axios.get(apiUrl).then(displayForecast);

}
 
function submittedCityWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cbc2508db8ce71927b5728c130e5af89&units=metric&dt=UTC`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let location = data.coord;
     let lat=data.coord.lat;
     let lon=data.coord.lon;
getDailyForecast(data.coord);
console.log(lat);
console.log(lon);

      let temperature = Math.round(data.main.temp);
      let windSpeed = Math.round(data.wind.speed);
      let weatherDescription = data.weather[0].description;
      let weatherIcon = data.weather[0].icon;
      let temp = document.querySelector("#temp");
      temp.innerHTML = `${temperature}`;
      let weatherDes = document.querySelector("#weatherDescription");
      weatherDes.innerHTML = `${weatherDescription}`;
      let iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
      let weatherIconDiv = document.querySelector("#weatherIcon");
      weatherIconDiv.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
      let wind = document.querySelector("#win");
      wind.innerHTML = `Wind: ${windSpeed} m/s`;
      let humidity = document.querySelector("#hum");
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
      let feelsLike = document.querySelector("#feels");
      feelsLike.innerHTML = `Feels Like: ${Math.round(data.main.feels_like)}℃`;
      let timezoneOffset = data.timezone; // Timezone offset in seconds
      let now = new Date();
      let utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // Current UTC time
      let cityTime = new Date(utcTime + timezoneOffset * 1000); // Current city time
      
      let options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
      let currentTime = cityTime.toLocaleString("en-US", options);


      // Update the element with the ID "current-time"
      document.querySelector("#current-time").textContent = currentTime;

      let tempCelsius = document.querySelector("#celsius");
      tempCelsius.addEventListener("click", function () {
        temp.innerHTML = `${temperature}`;
      });

      let tempFahrenheit = document.querySelector("#fahrenheit");
      tempFahrenheit.addEventListener("click", function () {
        temp.innerHTML = Math.round(`${temperature * 9 / 5 + 32}`);
      });

    })}
    
   
   


