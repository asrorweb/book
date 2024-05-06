import { MdOutlineEdit } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import BookService from "../services/book";
import { getItem } from "../helpers/persistens-storage";
import md5Generate from "../helpers/md5-generate";
import { deleteBookError, deleteBookStart, deleteBookSuccess } from "../reducer/book-reducer";
import { useNavigate } from "react-router-dom";

function BookCard({ data }) {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { author, cover, pages, published, title, id } = data.book;

   const deleteHandler = async () => {
      dispatch(deleteBookStart());

      const headers = {
         Key: getItem("key"),
         Sign: md5Generate("DELETE", `/books/${id}`),
      };

      try {
         await BookService.deleteBook(id, headers);
         dispatch(deleteBookSuccess());
      } catch (error) {
         console.log(error);
         dispatch(deleteBookError());
      }
   };

   const editHandler = () => navigate(`/dashboard/edit-book/${id}`);

   return (
      <div className="bg-[#FBFBFB] max-sm:mx-auto max-sm:max-w-96 shadow-xl rounded-lg relative group">
         <div className="absolute top-4 right-4 invisible group-hover:visible  bg-white flex items-center gap-3 p-2  rounded-lg">
            <MdOutlineEdit onClick={editHandler} className="w-5 h-5 cursor-pointer hover:scale-110 duration-150" />
            <CiTrash
               onClick={deleteHandler}
               className="w-5 h-5 cursor-pointer hover:scale-110 duration-150 text-red-600"
            />
         </div>
         <div className="p-1 mb-2">
            <img
               src={
                  cover ||
                  "https://media.gq.com/photos/5ad64204c8be07604e8b5f2f/1:1/w_1332,h_1332,c_limit/21-books-GQ-April-2018-041718-3x2.jpg"
               }
               alt={title}
               className="max-w-full aspect-auto mx-auto w-full object-fill h-[310px] rounded-lg"
            />
         </div>
         <div className="p-4">
            <p className="text-xl leading-none text-[#3D3D3D] mb-2">{title}</p>
            <div className="flex items-center justify-between">
               <span className="text-base text-gray-600">{author}</span>
               <span className="text-[#9654F4] bg-[#EFE6FD] inline-block px-4 rounded-3xl">{pages}</span>
            </div>
         </div>
      </div>
   );
}

export default BookCard;
