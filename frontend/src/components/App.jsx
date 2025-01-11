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

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const useAuth = () => useContext(AuthContext);
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : (<Navigate to="/login" />);
  }

  return (
    <MainContainer>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          )} />
          <Route path="/login" element={(<LoginPage />)} />
          <Route path="/signup" element={(<SignupPage />)} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MainContainer>
  )
}

export default App;
