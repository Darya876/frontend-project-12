import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import io from 'socket.io-client';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import store from './redux/index.js';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { addNewMessage } from './redux/messages.js';
import { 
  addNewChannel,
  removeChannel,
  renameChannel,
  setActiveChannel,
} from './redux/channels.js';
import ApiContext from './components/contexts/ApiContext.jsx';

const init = async () => {
  const { dispatch } = store;
  const socket = io('<http://localhost>');

  const emitMessage = async (nameEmit, bodyEmit) => {
    const response = await socket.timeout(2000).emitWithAck(nameEmit, bodyEmit);
    return response;
  };

  const emitChannel = async (nameEmit, bodyEmit) => {
    const response = await socket
      .timeout(2000)
      .emitWithAck(nameEmit, bodyEmit);
    if (nameEmit === 'newChannel') {
      const { data } = response;
      dispatch(setActiveChannel(data.id));
    }
    return response;
  };

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

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
    <I18nextProvider i18n={i18n} defaultNS="translation">
      <ApiContext.Provider value={{ socket: { socket }, emitMessage, emitChannel }}>
        <Provider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Provider>
      </ApiContext.Provider>
    </I18nextProvider>
  );
};

export default init;