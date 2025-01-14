import { useContext } from 'react';
import AuthContext from '../components/contexts/AuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;