import './style.css';

import WeatherAPI from './api';

const apiKey = 'ec0eb0c7fd39486ea5f214326231107';
const location = 'Brussels';

const weatherAPI = new WeatherAPI(apiKey);

function renderWeatherData(data, currentTime) {
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

  document.getElementById('temperature').textContent = temperature;
  document.getElementById('weather-description').textContent = weatherDescription;
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
