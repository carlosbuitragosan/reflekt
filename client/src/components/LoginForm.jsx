import { useState } from 'react';
import { loginUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, setUser } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';

export const LoginForm = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewPassword, setViewPassword] = useState(false);
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
      const response = await loginUser(email, password);

      if (response.status === 200) {
        const { user } = response.data;
        dispatch(setUser(user));
        navigate('/diary-entry');
      } else {
        console.error('Login failed: ', response.msg);
      }
      setFormData({
        email: '',
        password: '',
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const togglePassword = () => {
    setViewPassword((prevState) => !prevState);
  };
  if (isAuthenticated) {
    navigate('/diary-entry');
  }
  return (
    <div>
      <h1>Login</h1>
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
          <label htmlFor="password">Password</label>
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
        <button type="submit">Log In</button>
      </form>
      <div>
        <p>Not a user?</p>
        <button onClick={() => navigate('/register')}>
          Register here
        </button>
      </div>
    </div>
  );
};
