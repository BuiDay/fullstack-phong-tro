import axiosConfig from '../../../utils/axiosConfig'

const apiGetPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all',
        })
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})

const apiGetPostsLimit = (query:any) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limit`,
            params: query
        })
        resolve(response.data)

    } catch (error) {
        reject(error)
    }
})

const postService = {
    apiGetPosts,apiGetPostsLimit
}

export default postService