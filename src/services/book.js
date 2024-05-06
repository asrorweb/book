import axios from "./api";

const BookService = {
   async getAllBooks(headers) {
      const response = await axios.get("books", {
         headers,
      });
      return response;
   },
   async searchBook(title, headers) {
      const response = await axios.get(`books/${title}`, {
         headers,
      });
      return response;
   },
   async createBook(data, headers) {
      const response = await axios.post("books", data, {
         headers,
      });
      return response;
   },
   async deleteBook(id, headers) {
      const response = await axios.delete(`books/${id}`, {
         headers,
      });
      return response;
   },
   async editBook(id, data, headers) {
      const response = await axios.patch(`books/${id}`, data, {
         headers,
      });
      return response;
   },
};

export default BookService;
