import ApiContext from '../contexts/ApiContext.jsx';

const ChatApiProvider = ({ api, children }) => {
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
};

export default ChatApiProvider;