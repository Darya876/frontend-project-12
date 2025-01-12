import ReactDOM from 'react-dom/client';
import initSocket from './initSocket.js';
import init from './init.jsx';

const app = async () => {
  const socket = initSocket();
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(await init(socket));
};

app();
