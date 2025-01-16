import { useState } from 'react';
import { loginUser } from '../utils/auth';

export const Login = () => {
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
    try {
      const data = await loginUser(username, password);
      console.log(data);
      window.location.href = '/diary-entry';
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
