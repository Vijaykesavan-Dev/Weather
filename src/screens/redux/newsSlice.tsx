import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { NEWS_API_KEY } from '../Utils/utils';


interface NewsArgs {
  keyword: string;
}

export const fetchNews = createAsyncThunk('news/fetchNews', async ({keyword}:NewsArgs) => {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${NEWS_API_KEY}`
  );
  return response.data.articles;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: { articles: [], status: 'idle' },
  reducers:{},
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => { state.status = 'loading'; })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, state => { state.status = 'failed'; });
  },
});

export default newsSlice.reducer;
