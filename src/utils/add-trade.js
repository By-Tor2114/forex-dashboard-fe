import axios from 'axios';

const BASE_URL = require('./axios');

const addTrade = async ({ update }, auth) => {
  console.log(update, auth);

  try {
    const { data } = await axios.patch(
      `${BASE_URL}/users/update`,
      {
        update
      },
      {
        headers: { token: auth.token }
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export { addTrade };
