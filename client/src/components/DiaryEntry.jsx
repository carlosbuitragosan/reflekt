import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice.js';

export const DiaryEntry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logoutUser());
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
