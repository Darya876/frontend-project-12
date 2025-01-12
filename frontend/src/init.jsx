import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import App from './components/App';
import resources from './locales/index.js';
import store from './redux/store.js';
import AuthProvider from './components/providers/AuthProvider.jsx';
import ApiProvider from './components/providers/ApiProvider.jsx';

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <StoreProvider store={store}>
        <AuthProvider>
          <ApiProvider api={socket}>
            <App />
          </ApiProvider>
        </AuthProvider>
      </StoreProvider>
    </I18nextProvider>
  );
};

export default init;