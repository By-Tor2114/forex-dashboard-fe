import axios from 'axios';

const BASE_URL = require('./axios');

const authHandler = async ({ email, password }, path) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/${path}`, {
      email,
      password
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export { authHandler };
