// const debug = require('debug',)('weathermap',);

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');
const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const fetchForecastWeather = async (latitude, longitude) => {
  const endpoint = `${mapURI}/forecast?lat=${latitude}&lon=${longitude}&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
});

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
      date_time_text: x.dt_txt,
      weather_id: x.weather[0].id,
      weather_main: x.weather[0].main,
      weather_icon: x.weather[0].icon,
      temperature: x.main.temp,
      feels_like: x.main.feels_like,
      wind_speed: x.wind.speed,
      wind_deg: x.wind.deg,
      wind_gust: x.wind.gust,
      rain_probability: x.pop,
      rain: x.rain,
    }))
    : [];
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
