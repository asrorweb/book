import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "../reducer/auth-reducer";
import BooksReducer from "../reducer/book-reducer";

export const store = configureStore({
   reducer: {
      auth: AuthReducer,
      books: BooksReducer,
   },
   devTools: process.env.NODE_ENV !== "production",
});
