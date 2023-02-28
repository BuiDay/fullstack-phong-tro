import axiosConfig from '../../../utils/axiosConfig' 

export const apiGetCategories = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/category/all',
        })
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})

const appService = {
    apiGetCategories
}

export default appService