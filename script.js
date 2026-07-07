const getWeatherBtn = document.getElementById("get-weather-btn");
const cityInputBox = document.getElementById("city-name");
const weatherCodes = {
    0: "Clear Sky ☀️",
    1: "Mainly Clear 🌤️",
    2: "Partly Cloudy ⛅️",
    3: "Overcast ☁️",
    45: "Fog 🌁",
    48: "Depositing Rime Fog 🌁🧊",
    51: "Drizzle ☔️",
    53: "Drizzle ☔️",
    55: "Drizzle ☔️",
    56: "Freezing Drizzle 🧊☔️",
    57: "Freezing Drizzle 🧊☔️",
    61: "Rain 🌧️",
    63: "Rain 🌧️🌧️",
    65: "Rain 🌧️🌧️🌧️",
    66: "Freezing Rain 🧊🌧️",
    67: "Freezing Rain 🧊🌧️🌧️",
    71: "Snow Fall 🌨️",
    73: "Snow Fall 🌨️🌨️",
    75: "Snow Fall 🌨️🌨️🌨️",
    77: "Snow grains 🌨️",
    80: "Rain Shower 🌧️",
    81: "Rain Shower 🌧️🌧️",
    82: "Rain Shower 🌧️🌧️🌧️🌧️",
    85: "Snow Shower 🌧️",
    86: "Snow Shower 🌧️🌧️🌧️",
    96: "Thunderstorm ⛈️⚡️",
}

async function getCityCoordinates(city){
    try {
        const geocodeURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json&countryCode=CA`;
        
        const response = await fetch(geocodeURL);
        const data = await response.json();

        if(!response.ok){
            console.error(data.reason);
            return null;
        }

        if(!data.results){
            return null;
        }

        const { name, latitude, longitude } = data.results[0];

        return {name, latitude, longitude};

    } catch(error){
        console.error(error);
        return null;
    }
}

async function getWeather(city){
    try{
        const location = await getCityCoordinates(city);

        if(!location){
            return null;
        }

        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(location.latitude)}` + 
                            `&longitude=${encodeURIComponent(location.longitude)}&models=cmc_gem_seamless&`+ 
                            `current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,` + 
                            `wind_speed_10m,wind_gusts_10m&timezone=auto&forecast_days=1`;
        
        const response = await fetch(weatherURL);
        const data = await response.json();

        if(!response.ok){
            console.error(data.reason);
            return null;
        }

        return {data, name: location.name };

    } catch (error){
        console.error(error);
        return null;
    }
}


const cityName = document.getElementById("location");
const mainWeather = document.getElementById("weather-main");
const mainTemp = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");


async function showWeather(city){
    if(city === "") {
        alert("Please enter a city name.")
        return null;
    }

    const result = await getWeather(city);

    if(!result){
        alert("City not found.")
        return null;
    }
    
    const {data, name} = result;

    cityName.textContent = name;
    mainWeather.textContent = weatherCodes[data.current.weather_code] ?? "Unknown Weather";
    mainTemp.textContent = data.current.temperature_2m + " °C";
    feelsLike.textContent = "Feels Like: " + data.current.apparent_temperature + " °C";
    humidity.textContent = "Humidity: " + data.current.relative_humidity_2m + "%";
    windSpeed.textContent = `Wind: ${data.current.wind_speed_10m} km/h`;
    windGust.textContent = `Gusts: ${data.current.wind_gusts_10m} km/h`;
    
}


getWeatherBtn.addEventListener("click", () => showWeather(cityInputBox.value.trim()));

cityInputBox.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        showWeather(cityInputBox.value.trim());
    }
})
