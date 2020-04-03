import axios from 'axios';

const BASE_URL = require('./axios');

const addEditTrade = async (update, auth, method) => {
  console.log(update, auth, method, 'addEditTrade');

  try {
    const { data } = await axios.post(
      `${BASE_URL}/trades`,
      {
        ...update
      },
      {
        headers: { token: auth }
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export { addEditTrade };
