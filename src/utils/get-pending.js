import axios from 'axios';

const BASE_URL = require('./axios');

const getPending = async (token) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/trades/pending`, {
      params: {},
      headers: { token },
    });

    return data;
  } catch (error) {
    return error.response.data.error;
  }
};

export { getPending };
