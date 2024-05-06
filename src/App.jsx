import { useDispatch } from "react-redux";
import { signUserError, signUserStart, signUserSuccess } from "./reducer/auth-reducer";
import AuthService from "./services/auth";
import { getItem } from "./helpers/persistens-storage";
import md5Generate from "./helpers/md5-generate";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AddBook, Home, NotFound } from "./pages/dashboard";
import { SignUp } from "./pages/auth";
import { Navigation } from "./components";
import { Container } from "@mui/material";
import { Auth, Dashboard } from "./layouts";

function App() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const getUser = async () => {
      dispatch(signUserStart());
      const headers = {
         Key: getItem("key"),
         Sign: md5Generate("GET", "/myself"),
      };
      try {
         const { data } = await AuthService.getUser(headers);
         dispatch(signUserSuccess(data));
      } catch (error) {
         dispatch(signUserError());
         navigate("/auth/sign-up");
      }
   };

   useEffect(() => {
      getUser();
   }, []);

   return (
      <div>
         <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </div>
   );
}

export default App;
