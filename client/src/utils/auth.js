import axios from 'axios';

const API_BASE_URL = 'http://localhost:4001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, //Ensure cookies are included
});

export const loginUser = async (username, password) => {
  try {
    const response = await apiClient.post('/login', {
      username,
      password,
    });
    console.log('response in loginUser: ', response);
    return response;
  } catch (err) {
    if (err.response) {
      throw new Error(
        err.response.data.msg || 'An error occurred during login.',
      );
    }
    throw new Error('Unable to connect to server.');
  }
};
