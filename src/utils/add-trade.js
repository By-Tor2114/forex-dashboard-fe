import axios from 'axios';

const BASE_URL = require('./axios');

const addTrade = async (update, auth) => {
  console.log(update, auth, 'addTrade');

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

export { addTrade };
