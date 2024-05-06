import { CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getItem } from "../../helpers/persistens-storage";
import md5Generate from "../../helpers/md5-generate";
import { useDispatch, useSelector } from "react-redux";
import BookService from "../../services/book";
import {
   getAllBooksError,
   getAllBooksStart,
   getAllBooksSuccess,
   searchBooksError,
   searchBooksStart,
   searchBooksSuccess,
} from "../../reducer/book-reducer";
import { BookCard, SearchBookCard } from "../../components";
import { v4 as uuidv4 } from "uuid";

function Home() {
   const { books, isLoading, isDelete, searchBook } = useSelector((state) => state.books);
   const dispatch = useDispatch();
   const [search, setSearch] = useState("");

   const getAllBooks = async () => {
      dispatch(getAllBooksStart());
      const headers = {
         Key: getItem("key"),
         Sign: md5Generate("GET", "/books"),
      };
      try {
         const { data } = await BookService.getAllBooks(headers);
         dispatch(getAllBooksSuccess(data.data));
      } catch (error) {
         dispatch(getAllBooksError());
      }
   };

   const handleChange = async (e) => {
      let title = e.target.value;
      setSearch(title);
      dispatch(searchBooksStart());
      const headers = {
         Key: getItem("key"),
         Sign: md5Generate("GET", `/books/${title}`),
      };
      try {
         const { data } = await BookService.searchBook(title, headers);
         dispatch(searchBooksSuccess(data.data));
      } catch (error) {
         dispatch(searchBooksError());
      }
   };

   useEffect(() => {
      getAllBooks();
   }, [isDelete]);

   return (
      <div>
         <div className="text-right mb-3">
            <TextField
               value={search}
               onChange={handleChange}
               size="small"
               label="Search..."
               variant="outlined"
               className=""
            />
         </div>

         {isLoading && <CircularProgress size="4rem" className="mx-auto !block" />}

         {search ? (
            <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
               {searchBook?.map((book) => {
                  return <SearchBookCard key={uuidv4()} data={book} />;
               })}
            </div>
         ) : (
            <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
               {books?.map((book) => {
                  return <BookCard key={uuidv4()} data={book} />;
               })}
            </div>
         )}
      </div>
   );
}

export default Home;
