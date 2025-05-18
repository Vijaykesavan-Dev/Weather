import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import newsReducer from './newsSlice';
import settingsReducer from './SettingSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    news: newsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
