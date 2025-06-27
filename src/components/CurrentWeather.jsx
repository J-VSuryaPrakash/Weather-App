function CurrentWeather({ data }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Current Weather</h1>
            <p className="text-blue-100 capitalize">
              {CurrentWeather.weather[0].description}
            </p>
          </div>
          <img
            src={getWeatherIcon(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">
              {Math.round(data.main.temp)}°
            </div>
            <div className="text-sm text-blue-100">Temperature</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold mb-1">
              {Math.round(data.main.feels_like)}°
            </div>
            <div className="text-sm text-blue-100">Feels like</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold mb-1">
              {data.main.humidity}%
            </div>
            <div className="text-sm text-blue-100">Humidity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold mb-1">
              {Math.round(data.wind.speed)} m/s
            </div>
            <div className="text-sm text-blue-100">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
}

export { CurrentWeather };
