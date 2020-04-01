import axios from 'axios';

const BASE_URL = require('./axios');

const updateUser = async update => {
  console.log(update);

  try {
    axios.patch();
  } catch (error) {}
};

export { updateUser };
