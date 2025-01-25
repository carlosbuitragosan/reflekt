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
    const response = await apiClient.post('/api/auth/logout');
    return response.data;
  } catch (err) {
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
    const response = await apiClient.post('/api/auth/register', {
      email,
      password,
    });
    return response;
  } catch (err) {
    if (err.response) {
      throw err;
    }
  }
};
