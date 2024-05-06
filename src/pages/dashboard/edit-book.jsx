import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editBookError, editBookStart, editBookSuccess } from "../../reducer/book-reducer";
import BookService from "../../services/book";
import { getItem } from "../../helpers/persistens-storage";
import md5Generate from "../../helpers/md5-generate";

function EditBook() {
   const { isLoading, books } = useSelector((state) => state.books);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();

   const book = books?.find((book) => book?.book?.id == id) || null;

   const [formData, setFormData] = useState({
      isbn: book?.book?.isbn,
      title: book?.book?.title,
      author: book?.book?.author,
      published: book?.book?.published,
      pages: book?.book?.pages,
   });
   const [status, setStatus] = useState(book?.status);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleChangeStatus = (e) => {
      setStatus(e.target.value);
   };

   useEffect(() => {
      if (!books) navigate("/dashboard");
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(editBookStart());

      let data = { book: formData, status };

      const headers = {
         Key: getItem("key"),
         Sign: md5Generate("PATCH", `/books/${id}`, data),
      };

      try {
         await BookService.editBook(id, data, headers);
         dispatch(editBookSuccess());
         navigate("/dashboard");
      } catch (error) {
         dispatch(editBookError());
      }
   };

   const cancelHandler = () => navigate("/dashboard");

   return (
      <div>
         <Typography variant="h4" className="!mb-4">
            Edit Book
         </Typography>

         <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            className="px-3 py-7 shadow-xl rounded-lg flex flex-col gap-4"
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
               value={formData?.isbn}
               onChange={handleChange}
            />
            <TextField
               size="small"
               id="title"
               name="title"
               required
               autoFocus
               label="title"
               variant="outlined"
               className="w-full"
               value={formData?.title}
               onChange={handleChange}
            />
            <TextField
               size="small"
               id="author"
               name="author"
               required
               autoFocus
               label="author"
               variant="outlined"
               className="w-full"
               value={formData?.author}
               onChange={handleChange}
            />
            <TextField
               size="small"
               id="published"
               name="published"
               required
               autoFocus
               label="published"
               variant="outlined"
               className="w-full"
               value={formData?.published}
               onChange={handleChange}
            />
            <TextField
               size="small"
               id="pages"
               name="pages"
               required
               autoFocus
               label="pages"
               variant="outlined"
               className="w-full"
               value={formData?.pages}
               onChange={handleChange}
            />
            <TextField
               size="small"
               id="status"
               name="status"
               required
               autoFocus
               label="status"
               variant="outlined"
               className="w-full"
               value={status}
               onChange={handleChangeStatus}
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

export default EditBook;
