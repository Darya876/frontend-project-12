import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.messages = action.payload.messages;
    });
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export const { actions } = messagesSlice;
export default messagesSlice.reducer;