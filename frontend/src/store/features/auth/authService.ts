import axiosConfig from '../../../utils/axiosConfig' 
const apiRegister =  (data:any) => 
    new Promise(async(resolve, reject)=>{
        try {
            const res = await axiosConfig({
                method:"post",
                url:'/api/v1/auth/register',
                data:data
            })
            resolve(res.data)
        } catch (error) {
            reject(error)
        }
    })


const authService = {
    apiRegister
}

export default authService