import { fetchWeather } from './modules/api.js';
import { renderWeather } from './modules/ui.js';
import { validateCityInput } from './modules/validation.js';
import { initGoogleLogin } from './auth/google-login.js';

document.addEventListener('DOMContentLoaded', () => {
  initGoogleLogin();

  document.getElementById('add-city').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (!validateCityInput(city)) return alert('Invalid city');

    try {
      const data = await fetchWeather(city);
      renderWeather(data);
      localStorage.setItem('lastCity', city);
      sessionStorage.setItem('currentCity', city);
    } catch (e) {
      alert('Error fetching weather');
    }
  });
});

setInterval(() => {
  const city = sessionStorage.getItem('currentCity');
  if (city) {
    fetchWeather(city).then(renderWeather);
  }
}, 10 * 60 * 1000); 