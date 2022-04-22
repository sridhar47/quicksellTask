import axios from "axios";
import { baseURL } from "../helpers/config";

const put = (url, data) => {
    return axios.put(`${baseURL}${url}`, data)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    })
}
export default put;
