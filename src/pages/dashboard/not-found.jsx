import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
   return (
      <div className="min-h-screen min-w-full flex items-center justify-center flex-col gap-3">
         <Typography variant="h1" gutterBottom>
            404 Page not found
         </Typography>
         <Link to={"/dashboard"} className="text-xl">
            Go Home
         </Link>
      </div>
   );
}

export default NotFound;
