import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt); // we save this json web token into the local storage of browser
}

export function loginWithJwt(jwt) {
  // basically register function
  localStorage.setItem("token", jwt); // this makes sure that user automaticcally logge in after registering
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token"); // we get token stored on the browser after user registered
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  // for protected Apis
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
