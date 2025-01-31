import { configureStore } from '@reduxjs/toolkit';
import channelsSliceReducer from './channels';
import messagesSliceReducer from './messages';
import modalsSliceReducer from './modals';

export default configureStore({
  reducer: {
    channels: channelsSliceReducer,
    messages: messagesSliceReducer,
    modals: modalsSliceReducer,
  },
});