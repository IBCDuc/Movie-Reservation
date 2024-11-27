import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
   category:[]
};

export const categorytSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {       
        doSaveCategoryAction: (state, action) => {
          //  console.log('action',action);
            state.category = action.payload;
        },
    },

    
});


export const { doSaveCategoryAction } = categorytSlice.actions;

export default categorytSlice.reducer;
