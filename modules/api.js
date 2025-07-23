const API_KEY = 'YOUR_OPENWEATHER_API_KEY';

export async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}