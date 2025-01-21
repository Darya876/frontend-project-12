import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';
import _ from 'lodash';


const initialState = {
  channels: [
    { id: Number(_.uniqueId()), name: 'general', removable: false },
    { id: Number(_.uniqueId()), name: 'random', removable: false },
  ],
  activeChannel: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      state.channels = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      state.activeChannel = action.payload;
    },
    addChannel: (state, action) => {
      const channel = action.payload;
      state.channels.push(channel);
    },
    removeChannel: (state, action) => {
      const id = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      if (id === state.activeChannel) {
        state.activeChannel = 1;
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      state.channels = state.channels.map((channel) => (channel.id === id ? ({ ...channel, name }) : channel));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.channels = action.payload.channels;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  renameChannel,
  removeChannel,
  addChannel,
  setCurrentChannelId,
  setChannels,
} = channelsSlice.actions;

export const { actions } = channelsSlice;

export default channelsSlice.reducer;