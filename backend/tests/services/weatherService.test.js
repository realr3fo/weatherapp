const { fetchWeather } = require('../../src/services/weatherService');
const fetch = require('node-fetch');
const sinon = require('sinon');
const { expect } = require('chai');

describe('fetchWeather', function () {
  it('returns data correctly', async function () {
    sinon.stub(fetch, 'Promise').returns(
      Promise.resolve({
        json: () => ({ weather: [{ id: 1 }] }),
      })
    );

    const data = await fetchWeather();

    expect(data).to.eql({ weather: [{ id: 1 }] });

    fetch.Promise.restore();
  });
});
