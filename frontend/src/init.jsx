import React from 'react';
// import Rollbar from 'rollbar';
import { ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import store from './redux/store.js';
import App from './components/App.jsx';
import resources from './locales/index.js';
import ApiProvider from './components/providers/ApiProvider.jsx';
import AuthProvider from './components/providers/AuthProvider.jsx';
import { addMessage } from './redux/messages.js';
import { addChannel, removeChannel, renameChannel } from './redux/channels.js';
import { io } from 'socket.io-client';

const init = async () => {
  const socket = io();
  const api = () => ({
    sendMessage: (...args) => socket.emit('newMessage', ...args),
    addChannel: (...args) => socket.emit('newChannel', ...args),
    renameChannel: (...args) => socket.emit('renameChannel', ...args),
    removeChannel: (...args) => socket.emit('removeChannel', ...args),
  });
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel({
      id: payload.id,
      name: payload.name,
    }));
  });
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('ru'));
  leoProfanity.add(leoProfanity.getDictionary('en'));

  // const rollbarConfig = {
  //   enabled: true,
  //   // FIX SECRET-TOKEN !!!
  //   accessToken: '1099e6e158b44ca18ec8d6d92c4717c9',
  //   captureUncaught: true,
  //   captureUnhandledRejections: true,
  // };

  // const rollbar = new Rollbar(rollbarConfig);
 
  return (
    // <RollbarProvider config={rollbar}>
      <Provider store={store}>
        <ErrorBoundary>
          <React.StrictMode>
            <I18nextProvider i18n={i18n} defaultNS="translation">
              <AuthProvider>
                <ApiProvider value={api}>
                  <App />
                </ApiProvider>
              </AuthProvider>
            </I18nextProvider>
          </React.StrictMode>
        </ErrorBoundary>
      </Provider>
    // </RollbarProvider>
  );
};

export default init;