import axios from 'axios';

const BASE_URL = require('./axios');

const updateUser = async ({ update }, token) => {
  console.log(update);

  try {
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
    return error.response.data.message;
  }
};

export { updateUser };
