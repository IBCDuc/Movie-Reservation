import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  schedule: null,
  movieName: '',  // Add movie name field
};

const showtimeSlice = createSlice({
  name: 'showtime',
  initialState,
  reducers: {
    setSchedule: (state, action) => {
      state.schedule = action.payload;
    },
    setMovieName: (state, action) => {
      state.movieName = action.payload;
    },
  },
});

export const { setSchedule, setMovieName } = showtimeSlice.actions;
export default showtimeSlice.reducer;