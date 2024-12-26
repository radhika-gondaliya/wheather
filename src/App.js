import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    const apiKey = "3ca9ffc139bce45a4308748aab02de20";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setError(data.message || "City not found!");
        setWeather(null);
      }
    } catch (err) {
      setError("Something went wrong!");
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <h1>WEATHER APP</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="submit" onClick={fetchWeather}>
          Get Weather
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="information">
          <p>Weather in {weather.name}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
