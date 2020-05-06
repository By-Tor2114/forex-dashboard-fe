import axios from 'axios';

const BASE_URL = require('./axios');

const addEditDeletePending = async (update, auth, method, _id) => {
  if (method === 'PATCH') {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/trades/pending`,
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
        `${BASE_URL}/trades/pending`,
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
      const { data } = await axios.delete(`${BASE_URL}/trades/pending`, {
        headers: {
          token: auth,
        },
        data: {
          _id,
        },
      });

      return data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }
};

export { addEditDeletePending };
