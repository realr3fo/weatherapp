const { fetchForecastWeather } = require('../../src/services/forecastService');
const fetch = require('node-fetch');
const sinon = require('sinon');
const { expect } = require('chai');

describe('fetchForecastWeather', function () {
  it('returns data correctly', async function () {
    sinon.stub(fetch, 'Promise').returns(
      Promise.resolve({
        json: () => ({
          list: [{ dt: 123 }],
        }),
      })
    );

    const latitude = 60.17;
    const longitude = 24.93;

    const data = await fetchForecastWeather(latitude, longitude);

    expect(data).to.eql({ list: [{ dt: 123 }] });

    fetch.Promise.restore();
  });
});
