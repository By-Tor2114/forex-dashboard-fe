import axios from 'axios';

const BASE_URL = require('./axios');

const addEditDeleteTrade = async (update, auth, method, _id) => {
  if (method === 'PATCH') {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/trades`,
        {
          update,
          _id,
        },
        {
          headers: { token: auth },
        }
      );

      return data;
    } catch (error) {
      return error.response.data.message;
    }
  } else if (method === 'POST') {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/trades`,
        {
          ...update,
        },
        {
          headers: { token: auth },
        }
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  } else {
    try {
      const { data } = await axios.delete(`${BASE_URL}/trades`, {
        headers: {
          token: auth,
        },
        data: {
          _id,
        },
      });

      return data.message;
    } catch (error) {
      console.log(error.response.data.message);

      return error.response.data.message;
    }
  }
};

export { addEditDeleteTrade };
