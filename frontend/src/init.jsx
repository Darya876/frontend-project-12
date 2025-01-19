import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import store from './redux/index.js';
import App from './components/App.jsx';
import resources from './locales/index.js';
import ApiProvider from './components/providers/ApiProvider.jsx';
import AuthProvider from './components/providers/AuthProvider.jsx';

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
 
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS="translation">
        <AuthProvider>
          <ApiProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
          </ApiProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;