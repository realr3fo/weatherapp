const baseURL = process.env.ENDPOINT;

const timeout = (ms) => new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error('Request timed out'));
  }, ms);
});

const getWeatherFromApi = async (latitude, longitude) => {
  try {
    const response = await Promise.race([
      fetch(`${baseURL}/api/weather/forecast?latitude=${latitude}&longitude=${longitude}`),
      timeout(5000), // 5000 ms = 5 seconds
    ]);

    if (!response.ok) {
      throw new Error('Could not fetch the data for that resource');
    }

    return response.json();
  } catch (error) {
    if (error.message === 'Load failed' || error.message === 'Request timed out') {
      throw new Error('Could not connect to the server. Please check your internet connection or try again later.');
    } else {
      throw error;
    }
  }
};

export default getWeatherFromApi;
