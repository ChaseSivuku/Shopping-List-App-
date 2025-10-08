import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from '../features/usersSclice';
// import other reducers...

export const store = configureStore({
  reducer: {
    // Add the reducer from each slice here
    users: usersSlice.reducer,
  },
  // middleware and devTools are configured with good defaults automatically
});