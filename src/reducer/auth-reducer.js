import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistens-storage";

const initialState = {
   isLoading: false,
   isLogin: false,
   user: null,
};

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      signUserStart: (state) => {
         state.isLoading = true;
      },
      signUserSuccess: (state, actions) => {
         state.isLoading = false;
         state.isLogin = true;
         state.user = actions.payload;
         setItem("key", actions.payload?.data?.key);
      },
      signUserError: (state) => {
         state.isLoading = false;
      },
   },
});

// Action creators are generated for each case reducer function
export const { signUserError, signUserStart, signUserSuccess } = authSlice.actions;

export default authSlice.reducer;
