import axios from 'axios';

const BASE_URL = require('./axios');

const getPending = async (token) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/trades/pending`, {
      params: {},
      headers: { token },
    });
    console.log(data, '<----- getPending: data');

    return data;
  } catch (error) {
    console.log(error, '<---- getPending: error');

    return error.response.data.message;
  }
};

export { getPending };
