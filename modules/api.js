const API = (() => {
  const API_KEY = '43d9a93655152e2892ca3efb3fa6ff03';

  async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("City not found");
      }

      return await res.json();
    } catch (err) {

      console.error("Error fetching weather data:", err);
      throw new Error(`API Error: ${err.message}`);
    }
  }

  return { fetchWeather };
})();