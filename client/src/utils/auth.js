import axios from 'axios';

const API_BASE_URL = 'http://localhost:4001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, //Ensure cookies are included
});

export const loginUser = async (username, password) => {
  console.log('login attempt: ', username, password);
  try {
    const response = await apiClient.post('/login', {
      username,
      password,
    });
    console.log('login response: ', response.data);
    return response.data;
  } catch (err) {
    console.log('error: ', err);
    if (err.response) {
      throw new Error(
        err.response.data.msg || 'An error occurred during login.',
      );
    }
    throw new Error('Unable to connect to server.');
  }
};
