import React from 'react';
import Arrow from './Arrow';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (latitude, longitude) => {
  try {
    const response = await fetch(`${baseURL}/weather/forecast?latitude=${latitude}&longitude=${longitude}`);
    return response.json();
  } catch (error) {
    // TODO: Handle error
    console.error(error);
  }

  return [];
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: [],
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const weatherData = await getWeatherFromApi(latitude, longitude);
      if (weatherData.length === 0) {
        // TODO: Handle error
        console.error('weather data not found');
      }

      this.setState({
        weatherData,
        city: weatherData[0].location,
      });
    }, (error) => {
      // TODO: Handle error
      console.error(error.code);
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
      const { weatherData, city } = this.state;
      const groupedWeatherData = this.groupByDate(weatherData);

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
                    {/* <p>{`${data.wind_deg}`}</p> */}
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
