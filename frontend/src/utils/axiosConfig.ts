import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8000"
})

instance.interceptors.request.use(function(config){
    const token = localStorage.getItem("persist:auth");
    console.log(token);
    return config
},function(err){
    console.log(err);
    return Promise.reject(err);
})

export default instance