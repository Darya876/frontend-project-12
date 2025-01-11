import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('channels/fetchData', async (getAuthHeader, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  channelsState: null,
  error: null,
})

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
    setDefaultChannelId: (state, { payload }) => {
      if (payload === state.currentChannelId) {
        state.currentChannelId = 1;
      }
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.channelsState = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        channelsAdapter.addMany(state, channels);
        state.currentChannelId = currentChannelId;
        state.channelsState = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, { payload }) => {
        state.channelsState = 'failed';
        state.error = payload;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;