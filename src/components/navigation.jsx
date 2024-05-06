import { Avatar, Button, Container, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";

function Navigation() {
   const { user } = useSelector((state) => state.auth);

   return (
      <Container className="glasses-effect shadow-xl relative top-4 bg-slate-500 rounded-lg py-3 !flex items-center justify-between">
         <Link to={"/dashboard"} className="text-xl">
            Book Store
         </Link>
         <div className="flex items-center gap-2">
            <Link to={"/dashboard/add-book"}>
               <Button variant="contained" size="medium" startIcon={<IoIosAdd />} className="!capitalize">
                  Create a book
               </Button>
            </Link>
            <Avatar sx={{ bgcolor: blue[500] }}>{user?.data?.name?.slice(0, 2)}</Avatar>
         </div>
      </Container>
   );
}

export default Navigation;
