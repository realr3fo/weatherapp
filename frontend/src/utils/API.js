const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (latitude, longitude) => {
  try {
    const response = await fetch(`${baseURL}/api/weather/forecast?latitude=${latitude}&longitude=${longitude}`);
    return response.json();
  } catch (error) {
    this.setState({ error: 'Forecast API not reachable', isLoading: false });
  }

  return [];
};

export default getWeatherFromApi;
