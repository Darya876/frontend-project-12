import { useContext } from 'react';
import ApiContext from '../components/contexts/ApiContext.jsx'

const useApi = () => useContext(ApiContext);

export default useApi;