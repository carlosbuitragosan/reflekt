import { useState } from 'react';
import { loginUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
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
    const { username, password } = formData;
    try {
      const response = await loginUser(username, password);

      if (response.status === 200) {
        const { user } = response.data;
        dispatch(setUser(user));
        navigate('/diary-entry');
      } else {
        console.error('Login failed: ', response.msg);
      }
      setFormData({
        username: '',
        password: '',
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handlesubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
