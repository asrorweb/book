import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isLoading: false,
   books: null,
   isDelete: false,
   searchBook: null,
};

export const bookSlice = createSlice({
   name: "book",
   initialState,
   reducers: {
      getAllBooksStart: (state) => {
         state.isLoading = true;
      },
      getAllBooksSuccess: (state, actions) => {
         state.isLoading = false;
         state.books = actions.payload;
      },
      getAllBooksError: (state) => {
         state.isLoading = false;
      },
      searchBooksStart: (state) => {
         state.isLoading = true;
      },
      searchBooksSuccess: (state, actions) => {
         state.isLoading = false;
         state.searchBook = actions.payload;
      },
      searchBooksError: (state) => {
         state.isLoading = false;
      },

      createBookStart: (state) => {
         state.isLoading = true;
      },
      createBookSuccess: (state) => {
         state.isLoading = false;
      },
      createBookError: (state) => {
         state.isLoading = false;
      },

      deleteBookStart: (state) => {
         state.isLoading = true;
      },
      deleteBookSuccess: (state) => {
         state.isLoading = false;
         state.isDelete = !state.isDelete;
      },
      deleteBookError: (state) => {
         state.isLoading = false;
      },

      editBookStart: (state) => {
         state.isLoading = true;
      },
      editBookSuccess: (state) => {
         state.isLoading = false;
      },
      editBookError: (state) => {
         state.isLoading = false;
      },
   },
});

export const {
   getAllBooksStart,
   getAllBooksSuccess,
   getAllBooksError,
   createBookError,
   createBookStart,
   createBookSuccess,
   deleteBookStart,
   deleteBookSuccess,
   deleteBookError,
   editBookStart,
   editBookSuccess,
   editBookError,
   searchBooksStart,
   searchBooksSuccess,
   searchBooksError,
} = bookSlice.actions;

export default bookSlice.reducer;
