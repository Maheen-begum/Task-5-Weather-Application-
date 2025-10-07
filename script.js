const apiKey = "1f1259b452dc1ccb1ac92fed383a8806";

const searchBtn = document.getElementById("searchBtn");
const locateBtn = document.getElementById("locateBtn");
const cityInput = document.getElementById("cityInput");
const weatherBox = document.getElementById("weatherInfo");

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  displayWeather(data);
}

function displayWeather(data) {
  if (data.cod === "404") {
    alert("City not found. Try again!");
    return;
  }

  document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById("description").innerText = data.weather[0].description;
  document.getElementById("temperature").innerText = `🌡️ Temperature: ${data.main.temp} °C`;
  document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").innerText = `🌬️ Wind Speed: ${data.wind.speed} m/s`;

  weatherBox.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
  else alert("Please enter a city name.");
});

locateBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, () => {
      alert("Unable to access location.");
    });
  } else {
    alert("Geolocation not supported.");
  }
});

async function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  displayWeather(data);
}
