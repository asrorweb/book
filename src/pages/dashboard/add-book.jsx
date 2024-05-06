import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBookError, createBookStart, createBookSuccess } from "../../reducer/book-reducer";
import BookService from "../../services/book";
import { getItem } from "../../helpers/persistens-storage";
import md5Generate from "../../helpers/md5-generate";
import LoadingButton from "@mui/lab/LoadingButton";

function AddBook() {
   const { isLoading } = useSelector((state) => state.books);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSubmit = async (event) => {
      event.preventDefault();
      dispatch(createBookStart());

      const formData = new FormData(event.currentTarget);
      const data = {
         isbn: formData.get("isbn"),
      };
      const headers = {
         Key: getItem("key"),
         Sign: md5Generate("POST", "/books", data),
      };

      try {
         await BookService.createBook(data, headers);
         dispatch(createBookSuccess());
         navigate("/dashboard");
      } catch (error) {
         console.log(error);
         dispatch(createBookError());
      }
   };

   const cancelHandler = () => navigate("/dashboard");

   return (
      <div>
         <Typography variant="h4" className="!mb-4">
            Add Book
         </Typography>

         <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            className="px-3 py-7 shadow-xl rounded-lg"
         >
            <TextField
               size="small"
               id="isbn"
               name="isbn"
               required
               autoFocus
               label="isbn book"
               variant="outlined"
               className="w-full"
            />

            <div className="flex items-center gap-2 mt-4 justify-end">
               <Button onClick={cancelHandler} variant="outlined" color="info">
                  Cancel
               </Button>
               <LoadingButton loading={isLoading} type="submit" variant="contained">
                  Add Book
               </LoadingButton>
            </div>
         </Box>
      </div>
   );
}

export default AddBook;
