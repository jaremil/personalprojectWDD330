  let currentWeatherData = null;

  async function getWeather() {
    const cityInput = document.getElementById('city').value.trim();

    if (!cityInput) {
      alert("Please enter a city name.");
      return;
    }

    if (!Validator.isValidCityName(cityInput)) {
      alert("Invalid city name. Use only letters, spaces, or hyphens.");
      return;
    }

    try {
      const data = await API.fetchWeather(cityInput);
      currentWeatherData = data;
      sessionStorage.setItem(`weather_${data.name}`, JSON.stringify(data));
      UI.renderWeather(data);
    } catch (err) {
      document.getElementById('weather').innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    }
  }

  function saveToLocalStorage() {
    if (!currentWeatherData) {
      alert("No data to save. Get weather first.");
      return;
    }
    localStorage.setItem(`weather_${currentWeatherData.name}`, JSON.stringify(currentWeatherData));
    alert(`Weather data for ${currentWeatherData.name} saved to localStorage.`);
  }

  function displaySavedWeather() {
    UI.renderSavedWeatherList();
  }

  function deleteCityWeather() {
    const city = document.getElementById('deleteCity').value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    const key = `weather_${city}`;
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      alert(`Deleted weather data for ${city}.`);
    } else {
      alert(`No saved weather data found for ${city}.`);
    }
  }

  function clearSessionStorage() {
    sessionStorage.clear();
    alert("Session storage cleared.");
    document.getElementById('weather').innerHTML = '';
  }

  window.onload = function () {
    let lastCity = null;

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.startsWith("weather_")) {
        const data = JSON.parse(sessionStorage.getItem(key));
        UI.renderWeather(data);
        lastCity = data.name;
        break;
      }
    }

    if (lastCity) {
      setInterval(() => {
        document.getElementById('city').value = lastCity;
        getWeather();
      }, 10 * 60 * 1000);
    }
  };