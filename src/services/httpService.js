import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

//axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
axios.interceptors.response.use(null, (error) => {
  // will be triggered everytime we get error in the response from server and call fucntion which is second parameter in use() first paramter is when success
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast("An unexpected error occured"); //or tost.error
  }
  return Promise.reject(error);
});
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
