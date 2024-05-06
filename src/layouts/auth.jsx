import { Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/auth";

function Auth() {
   return (
      <div>
         <Routes>
            <Route path="/sign-up" exact element={<SignUp />} />
         </Routes>
      </div>
   );
}

export default Auth;
