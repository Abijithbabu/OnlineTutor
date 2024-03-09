import axios from "./axios";
import errorHandler from "./errorHandler";
import notify from "./notification";

// authentication api's
export const login = errorHandler((data) => axios.post(`/auth/login`, data))

export const signUp = async (data, dispatch) => {
  try {
    const res = await axios.post(`/auth/signup`, data);
    if (res.data) {
      dispatch({
        type: "user_login",
        payload: res.data,
      });
      return true;
    }
    return false;
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message
    console.error('Error ' + errorMessage)
    notify({ message: errorMessage, title: 'Error !', type: 'danger' })
    return
  }
};

export const sendOtp = errorHandler((data) => axios.post(`/auth/sendOtp`, data))

export const signOut = errorHandler((dispatch) => {
  dispatch({
    type: "user_logout",
    payload: "",
  });
  return axios.post(`/auth/logout`);
})
