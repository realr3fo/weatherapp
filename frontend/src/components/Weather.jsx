import React from 'react';
import Arrow from './Arrow';
import getWeatherFromApi from '../utils/API';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: [],
      error: null,
      isLoading: true,
    };

    this.groupByDate = this.groupByDate.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const weatherData = await getWeatherFromApi(latitude, longitude);
      if (weatherData.length === 0) {
        this.setState({ error: 'Weather data not found', isLoading: false });
      }

      this.setState({
        weatherData,
        city: weatherData.length > 0 ? weatherData[0].location : 'None',
        isLoading: false,
      });
    }, (error) => {
      this.setState({ error: `Geolocation error: ${error.message}`, isLoading: false });
    });
  }

  groupByDate = (data) => {
    const grouped = data.reduce((acc, curr) => {
      const date = new Date(curr.date_time_text).toDateString();
      if (!acc[date]) acc[date] = []; // Initialize array
      acc[date].push(curr);
      return acc;
    }, {});
    return Object.entries(grouped);
  }

  render() {
    const {
      weatherData, city, error, isLoading,
    } = this.state;
    const groupedWeatherData = this.groupByDate(weatherData);
    if (isLoading) {
      return (
        <div className="spinner-container">
          <div role="status" className="spinner" />
        </div>
      );
    }

    if (error) {
      return (
        <div>{`Error: ${error}`}</div>
      );
    }

    return (
      <div className="weather-forecast">
        <h1 className="location-header">{`Weather Forecast in ${city}`}</h1>
        {groupedWeatherData.map(([date, weatherDataForDate]) => (
          <div key={date} className="date-section">
            <h2 className="date-header">{date}</h2>
            <div className="weather-slot-container">
              {weatherDataForDate.map((data) => (
                <div key={data.dt} className="weather-slot">
                  <p>{data.date_time_text.split(' ')[1].split(':').slice(0, 2).join(':')}</p>
                  <p>{`Weather: ${data.weather_main}`}</p>
                  {data.weather_icon.slice(0, -1) && <img src={`/img/${data.weather_icon.slice(0, -1)}.svg`} alt="weather icon" />}
                  <p>{`Temperature: ${data.temperature}`}</p>
                  <p>{`Feels like: ${data.feels_like}`}</p>
                  <p>Wind (gusts):</p>
                  <Arrow degree={data.wind_deg} />
                  <p>{`${data.wind_speed}`}</p>
                  <p>{`(${data.wind_gust})`}</p>
                  <p>Rainfall:</p>
                  <p>{`${data.rain_probability}`}</p>
                  <p>{`${data.rain_3h}`}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Weather;
