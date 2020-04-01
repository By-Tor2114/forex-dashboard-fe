import axios from 'axios';

const BASE_URL = require('./axios');

const updateUser = async ({ update }, token) => {
  try {
    console.log(update, token, '<=== in try');

    const { data } = await axios.patch(
      `${BASE_URL}/users/update`,
      {
        update
      },
      {
        headers: { token: token.token }
      }
    );
    return data;
  } catch (error) {
    console.log(error.response.data.message, '<==== catch block');

    return error.response.data.message;
  }
};

export { updateUser };
