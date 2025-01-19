import ApiContext from '../contexts/ApiContext.jsx';
import { addNewMessage } from '../../redux/messages.js';
import { 
  addNewChannel,
  removeChannel,
  renameChannel,
  setActiveChannel,
} from '../../redux/channels.js';
import io from 'socket.io-client';
import store from '../../redux/index.js';


const ApiProvider = ({ children }) => {
  const { dispatch } = store;
  const socket = io('<http://localhost>');

  const emitMessage = async (nameEmit, bodyEmit) => {
    const response = await socket.emit(nameEmit, bodyEmit);
    return response;
  };

  const emitChannel = async (nameEmit, bodyEmit) => {
    const response = await socket.emit(nameEmit, bodyEmit);
    switch (nameEmit) {
      case 'newChannel':
        dispatch(addNewChannel(bodyEmit));
        dispatch(setActiveChannel(bodyEmit.id));
        break;
      case 'removeChannel':
        dispatch(removeChannel(bodyEmit.id));
        dispatch(setActiveChannel(1));
        break;
      case 'renameChannel':
        dispatch(renameChannel(bodyEmit));
        break;
      case 'newMessage':
        dispatch(addNewMessage(bodyEmit));
        break; // по сообщениям исправить
      default:
        console.error('Something went wrong!');
    }
    return response;
  };

  socket.on('newMessage', (payload) => {
    dispatch(addNewMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(addNewChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    const { id } = payload;
    dispatch(removeChannel(id));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
  });
  
  return (
    <ApiContext.Provider value={{ socket: { socket }, emitMessage, emitChannel }}>
      {children}
    </ApiContext.Provider>
  )
};

export default ApiProvider;