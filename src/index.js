import './style.css';

import WeatherAPI from './api';

let location = 'Brussels';
const apiKey = 'ec0eb0c7fd39486ea5f214326231107';
const weatherAPI = new WeatherAPI(apiKey);

const form = document.getElementById('search-form');

function handleSubmit(event) {
  event.preventDefault();

  const inputElement = form.querySelector('.search-box');

  const inputLocation = inputElement.value;
  location = inputLocation;

  weatherAPI.getWeatherData(location)
    .then((data) => {
      weatherAPI.getLocalTime(location)
        .then((timeData) => {
          const currentTime = new Date(timeData.location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
          // eslint-disable-next-line no-use-before-define
          renderWeatherData(data, currentTime);
        })
        // eslint-disable-next-line no-use-before-define
        .catch(handleError);
    })
    // eslint-disable-next-line no-use-before-define
    .catch(handleError);
}

// Add event listener to the form for form submission
form.addEventListener('submit', handleSubmit);

function renderWeatherData(data, currentTime) {
  const uvIndex = data.current.uv;
  const pressure = data.current.pressure_mb;
  const chanceOfRain = data.current.temp_c;
  const temperature = data.current.temp_c;
  const weatherDescription = data.current.condition.text;
  const iconUrl = `https:${data.current.condition.icon}`;
  const city = data.location.name;
  const { country } = data.location;
  const currentDate = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = dateFormatter.format(currentDate);

  const weekdayOptions = { weekday: 'long' };
  const weekdayFormatter = new Intl.DateTimeFormat('en-US', weekdayOptions);
  const formattedWeekday = weekdayFormatter.format(currentDate);

  // Update the DOM with the weather data
  document.getElementById('day').textContent = formattedWeekday;
  document.getElementById('date').textContent = formattedDate;
  document.getElementById('city').textContent = city;
  document.getElementById('country').textContent = country;
  document.getElementById('timezone').textContent = currentTime;
  document.getElementById('temp').textContent = `${temperature} °`;
  document.getElementById('desc').textContent = weatherDescription;
  document.getElementById('temp-icon').src = iconUrl;
  document.getElementById('chance-rain').textContent = `${chanceOfRain} %`;
  document.getElementById('pressure').textContent = `${pressure} Hpa`;
  document.getElementById('uv').textContent = uvIndex;
}

function handleError(error) {
  console.log(`Error: ${error.message}`);
}

weatherAPI.getWeatherData(location)
  .then((data) => {
    weatherAPI.getLocalTime(location)
      .then((timeData) => {
        const currentTime = new Date(timeData.location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        renderWeatherData(data, currentTime);
      })
      .catch(handleError);
  })
  .catch(handleError);
