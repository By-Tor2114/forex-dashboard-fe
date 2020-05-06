import axios from 'axios';

const BASE_URL = require('./axios');

const getTrades = async (token) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/trades`, {
      params: {},
      headers: { token },
    });

    return data;
  } catch (error) {
    localStorage.removeItem('token');
    window.location.reload(true);
    return error.response.data.error;
  }
};

export { getTrades };
