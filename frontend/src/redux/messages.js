import { createSlice, current } from '@reduxjs/toolkit';
import { removeChannel } from './channels';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    loadMessages: (state, { payload }) => {
      const { messages } = payload;
      state.messages = messages;
    },
    addNewMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const restMessages = current(state).messages
        .filter((message) => message.channelId !== payload);
      state.messages = restMessages;
    });
  },
});

export const { loadMessages, addNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;