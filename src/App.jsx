import { useState } from 'react'
import { MapPin, Loader2 } from "lucide-react"
import { CurrentWeather } from './components/CurrentWeather'
import './index.css'

function App() {

  const [weatherData, setWeatherData] = useState(null)
  const [searchCity, setSearchCity] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedDay, setSelectedDay] = useState("")
  const [currentCity, setCurrentCity] = useState("Hyderabad")

  // Openweathermap API key
  const API_KEY = process.env.API_KEY

  const getWeatherData = async (cityName = currentCity)=>{

    try {

      setLoading(true)
      setError("")
      
      const geoLocation = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`)
      const geoData = await geoLocation.json()

      if(!geoData){
        throw new Error("City not found")
      }
      
      const {lat, lon, name, country} = geoData[0]

      const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      const currentWeatherData = await currentWeather.json()

      const forecastWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      )
      const forecastWeatherData = await forecastWeather.json()

      setWeatherData({
        weather: currentWeatherData,
        forecast: forecastWeatherData.list,
        location: {name, country}
      })

      const today = new Date().toDateString()
      setSelectedDay(today)

    } catch (error) {
      setError(error instanceof Error ? err.message : "Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  } 

  const handleSearch = (e) => {
    e.preventDefault()

    if(searchCity.trim()){
      setCurrentCity(searchCity.trim())
      getWeatherData(searchCity.trim())
      setSearchCity("")
    }

  }

  const groupedForecast = (forecast) => {
    const group = {}

    forecast.foEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if(!group[date]){
        group[date] = []
      }

      group[date].push(item)
    })

    return group
  }

  const next3Days = () => {
    const days = []
    const today = new Date()

    for (let i = 0; i < 3; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date.toDateString())
    }

    return days
  }

  if(loading){

    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
          <div className="text-center text-white">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-lg">Loading weather data...</p>
          </div>
        </div>
      </>      
    )

  }

  if(error){

    return(
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-lg mb-4">
              Error: {error}
            </p>
            <button
              onClick={getWeatherData}
              className="px-6 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    )

  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 text-white mb-2">
                <MapPin className="w-5 h-5" />
                <h1 className="text-2xl font-bold text-black">
                  Hyderabad
                    {/* {weatherData.location.name}, {weatherData.location.country} */}
                </h1>  
              </div> 
              <p >Weather Forecast</p>     
              <form action="">
                <div>
                  <input 
                    type="text"
                    // value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    placeholder='Search for a city...'
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    // disabled={!searchCity.trim() || loading}
                    className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium hover:cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Weather */}

            <CurrentWeather currentWeatherData = {weatherData.weather}/>

            {/* Forecast Cards */}

            <ForecastCards 
            groupedForecast = {groupedForecast}
            next3Days = {next3Days}
            selectedDay = {selectedDay}
            onDaySelect = {setSelectedDay}
            />

            {/* Hourly forecast */}

            <HourlyForecast
            
            />

          </div>
      </div>
    </>
  )
}

export default App
