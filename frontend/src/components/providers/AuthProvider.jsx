import { useState } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const name = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).username : null;

  const [activeUser, setActiveUser] = useState(name);

  const setUser = (data) => {
    const { username } = data;
    setActiveUser(username);
    window.localStorage.setItem('user', JSON.stringify(data));
  };

  const logOut = () => {
    setActiveUser(null);
    localStorage.removeItem(activeUser);
  };

  const user = localStorage.length > 0 && JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const header = { Authorization: `Bearer ${user.token}` };

  return (
    <AuthContext.Provider value={{ logOut, activeUser, user, setUser, header }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;