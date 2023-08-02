require('dotenv').config();
const Koa = require('koa');
const cors = require('kcors');
const weatherRoutes = require('./routes/weather');
const forecastRoutes = require('./routes/forecast');

const port = process.env.PORT || 8080;

const app = new Koa();

app.use(cors());
app.use(weatherRoutes.routes());
app.use(forecastRoutes.routes());

app.listen(port);

console.log(`App listening on port ${port}`);
