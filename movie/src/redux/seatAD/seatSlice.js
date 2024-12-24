// src/redux/showtimeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seat: null,
};

const seatSlice = createSlice({
  name: 'seat',
  initialState,
  reducers: {
    setSeat: (state, action) => {
      state.seat = action.payload;
    },
  },
});

export const { setSeat } = seatSlice.actions;
export default seatSlice.reducer;
