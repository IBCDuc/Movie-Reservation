import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        id: "",
        user_name: "",
        email: "",
        avatar: "",
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
            state.role = action.payload.role

        },

         //for admin/staff
        doLoginAdminAction: (state, action) => {
           
            state.isAuthenticated = true;
            state.isLoading = false;

            state.admin = action.payload;
            state.role = action.payload.role

        },
        
       

        doLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('token');
            localStorage.removeItem('persist:root');
            state.isAuthenticated = false;
            state.user = {
                id: "",
                user_name: "",
                email: "",
                phone_number: "",
                avatar: "",
                role: "",
                status: 0,
                verify: 0
            };  // Remove comma

            state.admin = {
                id: "",
                display_name: "",
                avatar: "",
                role: "",
                token: ""
            };  // Remove comma

            state.role = "";
        }

    },
    
});

export const { doLoginAction, doLogoutAction, doLoginAdminAction, doUpdateInfoAction } = accountSlice.actions;


export default accountSlice.reducer;
