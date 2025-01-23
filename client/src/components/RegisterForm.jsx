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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const response = await registerUser(email, password);
      if (response.status === 201) {
        const { user } = response.data;
        dispatch(setUser(user));
        navigate('/diary-entry');
      } else {
        console.error('Registration failed: ', response.msg);
      }
      setFormData({ email: '', password: '' });
    } catch (err) {
      setErrorMessage(err.message);
      setFormData({ email: '', password: '' });
      console.error(err.message);
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
          <button type="button" onClick={togglePassword}>
            {viewPassword ? 'hide' : 'show'}
          </button>
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
