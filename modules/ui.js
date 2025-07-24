const UI = (() => {
  
  function renderWeather(data) {
    try {
      const html = `
        <h3>Weather in ${data.name}, ${data.sys.country}</h3>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
      `;
      document.getElementById('weather').innerHTML = html;
    } catch (err) {
      console.error("Error rendering weather data:", err);
      document.getElementById('weather').innerHTML = `<p style="color: red;">Failed to display weather. Please try again later.</p>`;
    }
  }

  function renderSavedWeatherList() {
    try {
      const container = document.getElementById('weather');
      container.innerHTML = '<h3>Saved Weather Data</h3>';

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("weather_")) {
          const data = JSON.parse(localStorage.getItem(key));
          container.innerHTML += `
            <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
              <strong>${data.name}, ${data.sys.country}</strong><br>
              Temp: ${data.main.temp}°C<br>
              Weather: ${data.weather[0].main} - ${data.weather[0].description}<br>
              Humidity: ${data.main.humidity}%<br>
              Wind: ${data.wind.speed} m/s<br>
            </div>
          `;
        }
      }
    } catch (err) {
      console.error("Error rendering saved weather list:", err);
      document.getElementById('weather').innerHTML = `<p style="color: red;">Failed to load saved weather data. Please try again later.</p>`;
    }
  }

  return { renderWeather, renderSavedWeatherList };
})();