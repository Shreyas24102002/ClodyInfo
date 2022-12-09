import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/Current-Weather/Current-Weather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/Forecast";
import Navbar from "./components/Navbar";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    // URL from openweather api for Current Weather : -

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // For Forecast : -

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])

      // Promise object is used for handling asynchronous computations which has some important guarantees that are difficult to handle with the callback method (the more old-school method of handling asynchronous code).
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        // We need to use json() inorder to map the response
        const forecastResponse = await response[1].json();
        // Now we have to create two hooks to store these two

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <>
      <Navbar />
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {/* Here we are checking widget exist or not. If widget is present it will 
       print, else it will not show anything*/}
        {forecast && <Forecast data={forecast} />}
      </div>
    </>
  );
}

export default App;
