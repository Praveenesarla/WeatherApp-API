import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch weather data from Yahoo Weather API
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=sunnyvale,ca&format=json'
        );
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return null;
  }

  // Extract necessary weather information from the data object
  const { current_observation } = weatherData;
  const { city, condition, temperature } = current_observation;

  return (
    <div>
      <h1>{city}</h1>
      <p>Condition: {condition.text}</p>
      <p>Temperature: {temperature}°C</p>
    </div>
  );
};

export default WeatherApp;
