import axios from 'axios';

const API_BASE_URL = 'http://localhost:4001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, //Ensure cookies are included
});

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password,
    });
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

export const logoutUser = async () => {
  try {
    console.log('sending logout request');
    const response = await apiClient.post('/api/auth/logout');
    console.log('logout response:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error logging out:', err);
    if (err.response) {
      throw new Error(
        err.response.data.msg || 'An error occurred during logout.',
      );
    }
    throw new Error('Unable to connect to the server.');
  }
};

export const registerUser = async (email, password) => {
  try {
    //send data to the server
    const response = await apiClient.post('/api/auth/register', {
      email,
      password,
    });
    return response;
  } catch (err) {
    //check if the err contains a response object from axios
    if (err.response) {
      //re-throw the error with the message from the server
      throw err;
    }
  }
};
