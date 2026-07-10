# Weather Application

https://julie-ddeng.github.io/weather-app/

A simple JavaScript weather app to look up real-time weather information for Canadian cities using Open-Meteo APIs.

## Features

- Searche for any Canadian city
- Displays:
    - Current and feels-like temperatures
    - Weather condition
    - Humidity
    - Wind speed and gusts
- Handles invalid city names
- Responsive user interaction using asynchronous API requests

## Technologies
- HTML
- CSS
- JavaScript
- Fetch API
- Open-Meteo Geocoding API
- Open-Meteo Weather API

## How it Works

1. User enters a city
2. App uses Open-Meteo Geocoding to retrieve geographic coordinates
3. Coordinates sent to Weather API
4. Weather information is displayed to the user

## Future Improvements

- Add a loading indicator (asynchronous UI)
- Build a more responsive design for mobile
- Add 7-day forecast
- Add search autocomplete to provide users with faster city selection.