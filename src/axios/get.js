import axios from "axios";
import { baseURL } from "../helpers/config";

const get = (url) => {
    return axios.get(`${baseURL}${url}`)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    })
}
export default get;
