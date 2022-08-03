import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';

export const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login('John Doe');
    navigate('/', {
      replace: true,
    });
  };

  return (
    <>
      <div className='container mt-5'>
        <h1>LoginPage</h1>
        <hr />
        <button className='btn btn-primary' onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
};
