import axios from "axios";
import { store } from "../redux/store";

const baseURL = `${process.env.REACT_APP_BASE_URL}`;

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

Axios.interceptors.request.use(
    function (config) {
        const user = store.getState().data.user;
        if (user && user?._id) {
            config.params = { ...config.params, user_id: user._id };
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    function (response) {
        if (response.data.blocked) {
            store.dispatch({ type: 'user_logout' });
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default Axios;
