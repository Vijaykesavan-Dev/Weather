import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from '../Utils/utils';

interface FetchWeatherArgs {
  lat: number;
  lon: number;
  unit: string;
}

export const fetchWeather = createAsyncThunk<any, FetchWeatherArgs>(
  'weather/fetchWeather',
  async ({ lat, lon, unit }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
    );
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: null, status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => { state.status = 'loading'; })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, state => { state.status = 'failed'; });
  },
});


export default weatherSlice.reducer;
