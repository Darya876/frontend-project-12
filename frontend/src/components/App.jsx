import 'bootstrap/dist/css/bootstrap.css';
import MainContainer from './MainContainer.jsx';
import { useContext } from 'react';
import AuthContext from './contexts/AuthContext.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NavBar from './NavBar.jsx';
import routes from '../routes.js';

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const useAuth = () => useContext(AuthContext);
    const { activeUser } = useAuth();
    return activeUser ? children : (<Navigate to={routes.loginPath} />);
  }

  return (
    <>
      <MainContainer>
        <NavBar />
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={(<ChatPage />)} /> */}
            <Route path={routes.root} element={(
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            )} />
            <Route path={routes.loginPath} element={(<LoginPage />)} />
            <Route path={routes.signupPath} element={(<SignupPage />)} />
            <Route path={routes.conflictPath} element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </MainContainer>
      <div className="Toastify"></div>
    </>
  )
}

export default App;
