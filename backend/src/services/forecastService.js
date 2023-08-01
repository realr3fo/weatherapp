const fetch = require('node-fetch');
const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';

const fetchForecastWeather = async (latitude, longitude) => {
  const endpoint = `${mapURI}/forecast?lat=${latitude}&lon=${longitude}&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

module.exports = { fetchForecastWeather };
