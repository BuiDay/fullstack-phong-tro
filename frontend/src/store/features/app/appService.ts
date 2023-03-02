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

export const apiGetPrices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/price/all'
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})
export const apiGetAreas = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/area/all'
        })
        resolve(response.data)
    } catch (error) {
        reject(error)
    }
})

const appService = {
    apiGetCategories,apiGetPrices,apiGetAreas
}

export default appService