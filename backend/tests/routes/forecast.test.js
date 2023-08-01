const { expect } = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const Koa = require('koa');
const proxyquire = require('proxyquire');

const sampleWeatherData = {
  list: [
    {
      dt: 1627845600,
      dt_txt: '2021-08-01 09:00:00',
      weather: [{ id: 800, main: 'Clear', icon: '01d' }],
      main: { temp: 298.15, feels_like: 299.5 },
      wind: { deg: 180, speed: 3.5, gust: 5 },
      pop: 0.1,
      rain: { '3h': 1.5 },
    },
  ],
  city: { name: 'Test City' },
};

describe('Weather Forecast API', () => {
  let app;

  beforeEach(() => {
    const fetchForecastWeatherStub = sinon.stub();
    fetchForecastWeatherStub.resolves(sampleWeatherData);

    const forecastServiceStub = {
      fetchForecastWeather: fetchForecastWeatherStub,
    };

    const router = proxyquire('../../src/routes/forecast', {
      '../services/forecastService': forecastServiceStub,
    });

    app = new Koa();
    app.use(router.routes());
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return weather data for a valid request', async () => {
    const latitude = 40.7128;
    const longitude = -74.0060;

    const response = await request(app.callback()).get(`/api/weather/forecast?latitude=${latitude}&longitude=${longitude}`);

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.deep.equal([
      {
        location: 'Test City',
        dt: 1627845600,
        date_time_text: '2021-08-01 09:00:00',
        weather_id: 800,
        weather_main: 'Clear',
        weather_icon: '01d',
        temperature: '25°C',
        feels_like: '26°C',
        wind_deg: 180,
        wind_speed: '3.5 m/s',
        wind_gust: '5 m/s',
        rain_probability: '10%',
        rain_3h: '1.5 mm',
      },
    ]);
  });

  it('should return an error for an invalid request', async () => {
    const response = await request(app.callback()).get('/api/weather/forecast');

    expect(response.status).to.equal(400);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.deep.equal({ error: 'Missing latitude and/or longitude parameters' });
  });
});
