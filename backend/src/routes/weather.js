const router = require('koa-router')();
const { fetchWeather } = require('../services/weatherService');

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
});

module.exports = router;
