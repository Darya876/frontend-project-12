import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData, actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        messagesAdapter.addMany(state, messages);
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const remainingMessages = Object.values(state.entities)
          .filter(({ channelId }) => channelId !== payload);
        messagesAdapter.setAll(state, remainingMessages);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;