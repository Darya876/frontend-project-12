import { useState } from 'react';
import AuthContext from '../contexts/AuthContext'; 

const AuthProvider = ({ children }) => {
  const name = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).username : null;

  const [activeUser, setActiveUser] = useState(name);

  const logIn = (data) => {
    const { username } = data;
    setActiveUser(username);
    localStorage.setItem('user', JSON.stringify(data));
  };
  const logOut = () => {
    localStorage.removeItem(activeUser);
    setActiveUser(null);
  };
  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${activeUser.token}` },
  });

  const authValue = {
    activeUser, getAuthHeaders, logOut, logIn,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
