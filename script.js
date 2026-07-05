const getWeatherBtn = document.getElementById("get-weather-btn");
const dropDown = document.querySelector("select");

async function getWeather(city){
    try {
        const fetchResponse = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);

        if(!fetchResponse.ok){
            return null;
        }
        return fetchResponse.json();
    } catch (error) {
        console.log("An error has occurred while fetching weather information: ", error);
        return null;
    }
}


const cityName = document.getElementById("location");
const mainWeather = document.getElementById("weather-main");
const weatherIcon = document.getElementById("weather-icon");
const mainTemp = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");


async function showWeather(city){
    if(city === "") return null;

    const data = await getWeather(city);
    if(!data){
        alert("Something went wrong, please try again later");
        return;
    }
    const getValue = value => value ?? "N/A";

    cityName.textContent = getValue(data.name);
    mainWeather.textContent = getValue(data["weather"][0]["main"]);
    weatherIcon.src = getValue(data["weather"][0]["icon"]);
    mainTemp.textContent = data.main.temp + "°C";
    feelsLike.textContent = "Feels Like: " + getValue(data.main.feels_like + "°C");
    humidity.textContent = "Humidity: " + getValue(data.main.humidity);
    windSpeed.textContent = data.wind.speed === undefined ? "Wind: N/A" : `Wind: ${getValue(data.wind.speed)} m/s`;
    windGust.textContent = data.wind.gust === undefined ? "Gusts: N/A" : `Gusts: ${getValue(data.wind.gust)} m/s`;
    
}

getWeatherBtn.addEventListener("click", () => showWeather(dropDown.value));
