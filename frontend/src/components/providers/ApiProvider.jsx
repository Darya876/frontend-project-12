import ApiContext from '../contexts/ApiContext.jsx';

const ApiProvider = ({ api, children }) => {
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
};

export default ApiProvider;