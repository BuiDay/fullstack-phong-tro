import axios from '../../../utils/axiosConfig'
export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/user/get-current',
        })
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})


const userService = {
    apiGetCurrent
}


export default userService