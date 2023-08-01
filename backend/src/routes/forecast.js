const router = require('koa-router')();
const { fetchForecastWeather } = require('../services/forecastService');

router.get('/api/weather/forecast', async ctx => {
  const { latitude, longitude } = ctx.request.query;

  if (!latitude || !longitude) {
    ctx.status = 400; // Bad request
    ctx.body = { error: 'Missing latitude and/or longitude parameters' };
    return;
  }

  const weatherData = await fetchForecastWeather(latitude, longitude);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.list
    ? weatherData.list.map(x => ({
      location: weatherData.city.name,
      dt: x.dt,
      date_time_text: x.dt_txt,
      weather_id: x.weather[0].id,
      weather_main: x.weather[0].main,
      weather_icon: x.weather[0].icon,
      temperature: (x.main.temp - 273.15).toFixed(0) + '°C',
      feels_like: (x.main.feels_like - 273.15).toFixed(0) + '°C',
      wind_deg: x.wind.deg,
      wind_speed: x.wind.speed + ' m/s',
      wind_gust: x.wind.gust + ' m/s',
      rain_probability: (x.pop * 100).toFixed(0) + '%',
      rain_3h: (x.rain ? x.rain['3h'] : 0) + ' mm',
    }))
    : [];
});

module.exports = router;
