
function ForecastCards({ groupedForecast, next3Days, selectedDay, onDaySelect }){

  const getDayLabel = (dateString, index) => {
    if (index === 0) return "Today"
    if (index === 1) return "Tomorrow"
    return new Date(dateString).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const getWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
  }

  const getDayStats = (dayForecast) => {
    if (!dayForecast.length) return { min: 0, max: 0, icon: "01d", description: "" }

    const temps = dayForecast.map((item) => item.main.temp)
    const min = Math.min(...temps)
    const max = Math.max(...temps)
    const icon = dayForecast[0].weather[0].icon
    const description = dayForecast[0].weather[0].description

    return { min, max, icon, description }
  }

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">3-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {next3Days.map((day, index) => {
          const dayForecast = groupedForecast[day] || []
          const stats = getDayStats(dayForecast)
          const isSelected = selectedDay === day

          return (
            <button
              key={day}
              onClick={() => onDaySelect(day)}
              className={`p-4 rounded-xl transition-all duration-200 text-left ${isSelected ? "bg-white text-blue-600 shadow-lg scale-105" : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-lg">{getDayLabel(day, index)}</div>
                  <div className={`text-sm capitalize ${isSelected ? "text-blue-500" : "text-blue-100"}`}>
                    {stats.description}
                  </div>
                </div>
                <img
                  src={getWeatherIcon(stats.icon)}
                  alt={stats.description}
                  className="w-12 h-12"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{Math.round(stats.max)}°</div>
                <div className={`text-lg ${isSelected ? "text-blue-400" : "text-blue-200"}`}>{Math.round(stats.min)}°</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )

}

export {ForecastCards}