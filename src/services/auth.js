import axios from "./api";

const AuthService = {
   async registerUser(user) {
      const response = await axios.post("signup", user);
      return response;
   },

   async getUser(headers) {
      const response = await axios.get("myself", {
         headers,
      });
      return response;
   },
};

export default AuthService;
