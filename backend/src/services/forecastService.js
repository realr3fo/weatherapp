const fetch = require('node-fetch');
const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const mockApiURI = process.env.MOCK_API_ENDPOINT || 'http://mock-api:3000';

const fetchForecastWeather = async (latitude, longitude) => {
  const endpoint = `${process.env.NODE_ENV === 'test' ? mockApiURI : mapURI}/forecast?lat=${latitude}&lon=${longitude}&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

module.exports = { fetchForecastWeather };
