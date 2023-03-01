import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8000"
})

instance.interceptors.request.use(function(config){
    const token = localStorage.getItem("persist:auth");
    return config
},function(err){
    return Promise.reject(err);
})

export default instance