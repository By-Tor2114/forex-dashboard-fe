import axios from 'axios';

const BASE_URL = require('./axios');

const addEditTrade = async (update, auth, method, _id) => {
  // console.log(update, auth, method, 'addEditTrade');

  if (method === 'PATCH') {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/trades`,
        {
          update,
          _id
        },
        {
          headers: { token: auth }
        }
      );
      console.log(data, 'patching');

      return data;
    } catch (error) {
      return error.response.data.message;
    }
  } else {
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
  }
};

export { addEditTrade };
