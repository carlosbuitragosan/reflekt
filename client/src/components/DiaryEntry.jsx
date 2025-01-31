import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '../redux/authSlice.js';
import { logoutUser } from '../utils/auth.js';

export const DiaryEntry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const email = urlParams.get('email');
  console.log('Email from URL in /diary-entry:', email);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logoutUserAction());
      navigate('/login');
    } catch (err) {
      console.error('Logout failed: ', err.message);
    }
  };

  return (
    <>
      <button onClick={handleLogout}>Log out</button>
      <h1>Reflekt</h1>
    </>
  );
};
