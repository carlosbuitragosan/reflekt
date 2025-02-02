import { useEffect, useState } from 'react';
import { loginUser } from '../utils/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, setUser } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [viewPassword, setViewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //clear error message when user starts typing in password fields
    if (name === 'password' || name === 'confirmPassword') {
      setErrorMessage('');
    }
  };

  const handleGoogleSignin = async () => {
    window.open('http://localhost:4001/api/auth/google', '_self');
  };

  const handleGithubSignin = async () => {
    window.open('http://localhost:4001/api/auth/github', '_self');
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const email = urlParams.get('email');
    const googleId = urlParams.get('googleId');
    const githubId = urlParams.get('githubId');

    if (email && (googleId || githubId)) {
      dispatch(setUser({ email, googleId, githubId }));
      navigate('/diary-entry');
    }
  }, [location.search, dispatch, navigate]);

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
      setErrorMessage(err.message);
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          />
          <button type="button" onClick={togglePassword}>
            {viewPassword ? 'hide' : 'show'}
          </button>
        </div>
        <button type="submit">Log In</button>
      </form>
      <div>
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
        <button onClick={() => navigate('/register')}>
          Register
        </button>
        <button onClick={handleGoogleSignin}>
          Sign In with Google
        </button>
        <button onClick={handleGithubSignin}>
          Sign In with Github
        </button>
      </div>
    </div>
  );
};
