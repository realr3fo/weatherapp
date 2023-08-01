const { expect } = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const Koa = require('koa');
const proxyquire = require('proxyquire');

const sampleWeatherData = {
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
};

describe('Weather API', () => {
  let app;

  beforeEach(() => {
    const fetchWeatherStub = sinon.stub();
    fetchWeatherStub.resolves(sampleWeatherData);

    const weatherServiceStub = {
      fetchWeather: fetchWeatherStub,
    };

    const router = proxyquire('../../src/routes/weather', {
      '../services/weatherService': weatherServiceStub,
    });

    app = new Koa();
    app.use(router.routes());
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return weather data for a valid request', async () => {
    const response = await request(app.callback()).get('/api/weather');

    expect(response.status).to.equal(200);
    expect(response.type).to.equal('application/json');
    expect(response.body).to.deep.equal({
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    });
  });
});
