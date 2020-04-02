import axios from 'axios';

const BASE_URL = require('./axios');

const getTrades = async token => {
  try {
    const { data } = await axios.get(`${BASE_URL}/trades`, {
      params: {},
      headers: { token }
    });
    return data;
  } catch (error) {
    console.log(error);

    return error.response.data.message;
  }
};

export { getTrades };
