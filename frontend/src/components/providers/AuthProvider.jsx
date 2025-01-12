import { useState } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const authData = JSON.parse(localStorage.getItem('authtoken'));
  const [isLoggedIn, setLoggedIn] = useState(!!authData?.token);
  const [username, setUsername] = useState(authData?.username);

  const onAuth = async (values, type) => {
    try {
      console.log(type);
      const response = await axios.post(`/api/v1/${type}`, values);
      console.log(response);
      const authDat = response.data;
      const { status } = response;
      localStorage.setItem(
        'authtoken',
        JSON.stringify({ token: authDat.token, username: authDat.username }),
      );
      setUsername(authDat.username);
      setLoggedIn(true);
      return {
        status,
      };
    } catch (e) {
      const errorCode = e.response.status;
      throw new Error(errorCode);
    }
  };
  const onLogin = async (values) => onAuth(values, 'login');
  const onSignup = async (values) => onAuth(values, 'signup');

  const onLogout = () => {
    localStorage.removeItem('authtoken');
    setLoggedIn(false);
  };
  const getAuthHeader = () =>
    isLoggedIn ? { Authorization: `Bearer ${authData.token}` } : {};

  const value = {
    username,
    isLoggedIn,
    getAuthHeader,
    onLogin,
    onSignup,
    onLogout,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>);
};

export default AuthProvider;
