import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';
import axios from 'axios';

const getData = async (headers) => {
  const channels = axios.get(routes.apiChannelsPath, headers).then((response) => response.data);
  const messages = axios.get(routes.apiMessagesPath, headers).then((response) => response.data);
  const data = { channels, messages };
  console.log(data);

  return data;
}

const fetchData = createAsyncThunk('channels/fetchData', async (headers, { rejectWithValue }) => {
    try {
      const data = getData(headers);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue({
        message: err?.message,
        status: err?.response?.status,
        isAxiosError: err?.isAxiosError,
      });
    }
  },
);
export default fetchData;