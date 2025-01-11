// import { useContext } from 'react';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';
// import AuthContext from './contexts/AuthContext.jsx'

const NavBar = () => {
  // const { t } = useTranslation();
  // const useAuth = () => useContext();
  // const { isLoggedIn, onLogout } = useAuth(AuthContext);
  // const handleLogout = () => {
  //   onLogout();
  //   toast.info(t('toastMessagess.success'));
  // };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        <button type="button" className="btn btn-primary">Выйти</button>
      </div>
    </nav>
  )
};

export default NavBar;