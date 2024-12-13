// src/redux/movieSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callAllMovies } from '../../services/api'; // Hàm gọi API để lấy danh sách phim

// Async thunk để lấy danh sách phim từ API
export const getMovies = createAsyncThunk(
  'movie/getMovies',
  async () => {
    const response = await callAllMovies(); // Giả sử có hàm gọi API lấy danh sách phim
    return response.data; // Lấy dữ liệu danh sách phim
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [], // Danh sách phim
    loading: false, // Trạng thái loading
    error: null, // Lỗi nếu có
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true; // Đang tải dữ liệu
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload; // Lưu danh sách phim vào state
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Xử lý lỗi nếu có
      });
  },
});

export default movieSlice.reducer;
