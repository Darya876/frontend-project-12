import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import loaderReducer from './loaderSlice.js';
import modalReducer from './modalsSlice.js';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});

export default store;