import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';

export const GuestRoute = ({ children }) => {
  const user = useSelector(selectUser);
  console.log('user from guest route: ', user);
  if (user) return <Navigate to="/diary-entry" replace />;

  return children;
};
