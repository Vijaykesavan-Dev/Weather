// redux/SettingSlice.js

import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    unit: 'metric',
    categories: ['general', 'technology', 'health','crime','sports','science','weather','Entertainment'],
    selectedCategories: ['general'], 
  },
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
  },
});

export const { toggleUnit, setCategories, setSelectedCategories } = settingsSlice.actions;
export default settingsSlice.reducer;
