# 🌤️ React Weather App

A responsive React application that fetches and displays **current weather**, a **3-day forecast**, and **hourly forecast** for any searched city using a weather API.

## ✨ Features

- **Search weather by city**: Enter any city name to view its weather data.
- **Current weather**: Displays temperature, conditions, humidity, wind, etc.
- **3-day forecast**: Shows weather predictions for the next three days.
- **Hourly forecast**: View weather changes throughout the day.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js** (v14 or above recommended)
- **npm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/J-VSuryaPrakash/Weather-App.git
   cd Weather-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Get a Weather API Key:**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api) (or your chosen weather API provider) and obtain an API key.

4. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your API key:
     ```
     VITE_API_KEY=your_api_key_here
     ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Visit `http://localhost:5173` (or the port shown in your terminal).

## 🛠️ Technologies Used

- **React.js** – UI library
- **Vite** – Fast development build tool
- **Fetch API**– For HTTP requests
- **CSS/Styled Components** – For styling
- 
## 💡 Notes

- Make sure your `.env` file is not committed to version control.
- For Vite projects, always access environment variables using `import.meta.env.VITE_API_KEY`.
