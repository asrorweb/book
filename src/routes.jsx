import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/auth";
import { Home } from "./pages/dashboard";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
   },
   {
      path: "sign-up",
      element: <SignUp />,
   },
]);
