import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import accountReducer from '../redux/account/accountSlice';
import categoryReducer from '../redux/categoryAD/categorySlice';
import movieReducer from '../redux/movieAD/movieSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from "redux";
import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,

};

const reducers = combineReducers({
  counter: counterReducer,
  account: accountReducer,
  cate: categoryReducer,
  movie: movieReducer    
 });


const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunk]
});
