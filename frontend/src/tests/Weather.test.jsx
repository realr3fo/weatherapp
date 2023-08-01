import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Weather from '../components/Weather';
import getWeatherFromApi from '../utils/API';

jest.mock('../utils/API');

describe('Weather component', () => {
  beforeEach(() => {
    getWeatherFromApi.mockClear();
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn()
        .mockImplementationOnce((success) => Promise.resolve(success({
          coords: {
            latitude: 51.1,
            longitude: 45.3,
          },
        }))),
    };
  });

  it('displays a loading state', () => {
    getWeatherFromApi.mockImplementation(() => new Promise(() => {}));

    render(<Weather />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  /* eslint-disable no-console */
  it('displays weather data when it is loaded', async () => {
    // Temporarily mock console.error
    const originalError = console.error;
    console.error = jest.fn();

    getWeatherFromApi.mockResolvedValue([
      {
        location: 'City Name',
        date_time_text: '2023-08-01 12:00',
        weather_main: 'Cloudy',
        weather_icon: 'cloudy',
        temperature: 20,
        feels_like: 18,
        wind_deg: 45,
        wind_speed: '10 m/s',
        wind_gust: '15 m/s',
        rain_probability: '30%',
        rain_3h: '5 mm',
      },
    ]);

    render(<Weather />);

    await waitFor(() => expect(getWeatherFromApi).toHaveBeenCalledTimes(1));

    expect(await screen.findByText(/Weather Forecast in City Name/)).toBeInTheDocument();
    expect(screen.getByText(/12:00/)).toBeInTheDocument();
    expect(screen.getByText(/Weather: Cloudy/)).toBeInTheDocument();
    expect(screen.getByText(/Temperature: 20/)).toBeInTheDocument();
    expect(screen.getByText(/Feels like: 18/)).toBeInTheDocument();
    expect(screen.getByText(/10 m\/s/)).toBeInTheDocument();
    expect(screen.getByText(/(15 m\/s)/)).toBeInTheDocument();
    expect(screen.getByText(/30%/)).toBeInTheDocument();
    expect(screen.getByText(/5 mm/)).toBeInTheDocument();

    // Restore console.error
    console.error = originalError;
  });
  /* eslint-disable no-console */

  it('display error with message no weather data', async () => {
    getWeatherFromApi.mockResolvedValue([]);

    render(<Weather />);

    await waitFor(() => expect(getWeatherFromApi).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByText(/Weather data not found/)).toBeInTheDocument();
  });

  it('display error with message Geolocation not available', async () => {
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn()
        .mockImplementationOnce((success, failure) => Promise.resolve(failure({ message: 'Geolocation not active' }))),
    };

    render(<Weather />);

    await waitFor(() => expect(getWeatherFromApi).toHaveBeenCalledTimes(0));
    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByText(/Geolocation error: Geolocation not active/)).toBeInTheDocument();
  });
});
