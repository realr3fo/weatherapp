const express = require('express');
const app = express();
const port = 3000;

const mockResponse = {
  list: [
    {
      dt: 1629532800,
      dt_txt: '2023-08-01 00:00:00',
      weather: [{ id: 300, main: 'Drizzle', icon: '09d' }],
      main: { temp: 290.15, feels_like: 289.64 },
      wind: { speed: 3.09, deg: 320, gust: 4.47 },
      pop: 0.64,
      rain: { '3h': 0.64 }
    },
  ],
  city: { name: 'City Name' }
};

app.get('/forecast', (req, res) => {
  res.json(mockResponse);
});

app.listen(port, () => {
  console.log(`Mock OpenWeatherMap API listening at http://localhost:${port}`);
});
