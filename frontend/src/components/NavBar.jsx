import useAuth from '../hooks/useAuth.jsx';

const NavBar = () => {
  const OutButton = () => {
    const { activeUser, logOut } = useAuth();
    return activeUser ? <button type="button" onClick={logOut} className="btn btn-primary">Выйти</button> : null;
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        <OutButton />
      </div>
    </nav>
  )
};

export default NavBar;