import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { AddBook, EditBook, Home } from "../pages/dashboard";
import { Navigation } from "../components";

function Dashboard() {
   return (
      <>
         <Navigation />
         <Container className="mt-9">
            <Routes>
               <Route path="/" exact element={<Home />} />
               <Route path="/add-book" element={<AddBook />} />;
               <Route path="/edit-book/:id" element={<EditBook />} />
            </Routes>
         </Container>
      </>
   );
}

export default Dashboard;
