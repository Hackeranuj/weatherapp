import { useEffect, useState } from "react";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import AdditionalDetails from "./components/AdditionalDetails";

function App() {
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=ace33c317102e1d4a22d241e7dc420c3`
      );
      const data = await response.json();
      if (!data.message) {
        setWeatherData(data);
        setLoading(false);
        setErrorMsg("");
        setCityName("");
      } else {
        setLoading(false);
        setErrorMsg("City Not Found");
        setCityName("");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMsg("No Internet Connection");
    }
  };

  useEffect(() => {
    fetchWeatherData("New Delhi");
  }, []);
  return (
    <>
      {!loading ? (
        <div className="main_container">
          <div>
            <input
              type="text"
              placeholder="Enter city or country name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <button
              disabled={!cityName}
              onClick={() => {
                setLoading(true);
                fetchWeatherData(cityName);
              }}
            >
              Search
            </button>
            {!errorMsg ? (
              <>
                <CurrentWeather data={weatherData} />
                <AdditionalDetails data={weatherData} />
              </>
            ) : (
              <div className="notFound_msg">
                <h1>{errorMsg}</h1>
              </div>
            )}
          </div>
          {!errorMsg ? (
            <div>
              <Forecast data={weatherData} />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

export default App;
