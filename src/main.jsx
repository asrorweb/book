import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./configs/mui.js";
import { store } from "./store/index.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </ThemeProvider>
      </Provider>
   </React.StrictMode>
);
