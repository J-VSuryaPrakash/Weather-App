import { Clock, Droplets, Wind } from "lucide-react"

function HourlyForecast(){

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
  }

  const getDayLabel = (dateString) => {
    const today = new Date().toDateString()
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()

    if (dateString === today) return "Today"
    if (dateString === tomorrow) return "Tomorrow"
    return new Date(dateString).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5" />
        <h3 className="text-xl font-semibold">Hourly Forecast - {getDayLabel(selectedDay)}</h3>
      </div>

      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="text-center min-w-[60px]">
                <div className="font-semibold">{formatTime(item.dt)}</div>
              </div>

              <img
                src={getWeatherIcon(item.weather[0].icon) || "/placeholder.svg"}
                alt={item.weather[0].description}
                className="w-10 h-10"
              />

              <div className="flex-1">
                <div className="font-semibold capitalize">{item.weather[0].description}</div>
                <div className="text-sm text-blue-100">Feels like {Math.round(item.main.feels_like)}°</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-right">
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round(item.main.temp)}°</div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-blue-300" />
                  <span>{item.main.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-4 h-4 text-blue-300" />
                  <span>{Math.round(item.wind.speed)} m/s</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )    

}

export { HourlyForecast};