import axios from 'axios';

const BASE_URL = require('./axios');

const updateUser = async ({ update }, auth) => {
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

export { updateUser };
