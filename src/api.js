class WeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.weatherapi.com/v1';
  }

  async getWeatherData(location) {
    try {
      const response = await fetch(`${this.baseUrl}/current.json?key=${this.apiKey}&q=${location}`);
      if (!response.ok) {
        throw new Error('Weather data request failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error retrieving weather data: ${error.message}`);
    }
  }

  async getLocalTime(location) {
    try {
      const response = await fetch(`${this.baseUrl}/timezone.json?key=${this.apiKey}&q=${location}`);
      if (!response.ok) {
        throw new Error('Local time request failed');
      }
      const timeData = await response.json();
      return timeData;
    } catch (error) {
      throw new Error(`Error retrieving local time: ${error.message}`);
    }
  }
}

export default WeatherAPI;
