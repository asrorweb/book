import CryptoJS from "crypto-js";

const md5Generate = (method, url, body = false) => {
   let signString;

   if (body) {
      signString = `${method}${url}${JSON.stringify(body)}MySecret`;
   } else {
      signString = `${method}${url}MySecret`;
   }

   return CryptoJS.MD5(signString).toString();
};

export default md5Generate;
