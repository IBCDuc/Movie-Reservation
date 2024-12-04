import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        id: "",
        name: "",
        email: "",
        role:0,
        status: 0,
        baseRole: "",
    },

    admin: {
        id: "",
        display_name: "",
        avatar: "",
        role: "",
        token: "",
        baseRole: "",
    },

    role:"",
    
};


export const accountSlice = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        //for user
        doLoginAction: (state, action) => {
          
            state.isAuthenticated = true;
            state.isLoading = false;
            

            state.user = action.payload;
            state.role = action.payload.role

        },

        doUpdateInfoAction: (state, action) => {
          
            state.isAuthenticated = true;
            state.isLoading = false;

            state.user = action.payload;
           

        },

         //for admin/staff
        doLoginAdminAction: (state, action) => {
           
            state.isAuthenticated = true;
            state.isLoading = false;

            state.admin = action.payload;
            state.role = action.payload.baseRole

        },
        
       

        // doLogoutAction: (state, action) => {
        //     localStorage.removeItem('access_token');
        //     localStorage.removeItem('persist:root');
        //     state.isAuthenticated = false;
        //     state.user = {
        //         id: "",
        //         display_name: "",
        //         email: "",
        //         phone_number: "",
        //         avatar: "",
        //         role_id:0,
        //         status: 0,
        //         verify: 0,
        //     },

        //     state.admin = {
        //         id: "",
        //         display_name: "",
        //         avatar: "",
        //         role: "",
        //         token: ""
        //     },

        //     state.role = ""
        // },

    },
    
});

export const { doLoginAction, doLogoutAction, doLoginAdminAction, doUpdateInfoAction } = accountSlice.actions;


export default accountSlice.reducer;
