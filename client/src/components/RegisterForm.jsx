import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewPassword, setViewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //clear error message when user starts typing in password fields
    if (name === 'password' || name === 'confirmPassword') {
      setErrorMessage('');
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    try {
      const response = await registerUser(email, password);

      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      if (response.status === 201) {
        const { user } = response.data;
        dispatch(setUser(user));
        navigate('/diary-entry');
      } else {
        console.error('Registration failed: ', response.msg);
      }
    } catch (err) {
      // handle errorrs from axios
      if (err.response) {
        setErrorMessage(
          // display the error message from the server. 'data' containes the response from the server
          err.response.data.msg ||
            'An error occurred during registration.',
        );
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  const togglePassword = () => {
    setViewPassword((prevState) => !prevState);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handlesubmit}>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type={viewPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="button" onClick={togglePassword}>
            {viewPassword ? 'hide' : 'show'}
          </button>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type={viewPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};
