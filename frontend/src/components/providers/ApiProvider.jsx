import ApiContext from '../contexts/ApiContext';

const ApiProvider = ({ children, api }) => {
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;