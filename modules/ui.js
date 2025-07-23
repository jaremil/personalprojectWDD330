export function renderWeather(data) {
  const container = document.getElementById('weather-container');
  container.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temp: ${data.main.temp}</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
}