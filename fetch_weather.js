async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API}&units=imperial`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data fetch failed");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}