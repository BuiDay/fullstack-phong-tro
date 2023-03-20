import db from '../models'
const { Op } = require("sequelize");
import { v4 } from 'uuid'
import generateCode from '../utils/generateCode'
import generateDate from '../utils/generateDate'
import moment from 'moment'

export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const getPostsLimitService = (page, query, { priceNumber, areaNumber }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }
     
        if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber }
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            order: [['createdAt', 'DESC']],
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})


export const getNewPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']],
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
            ],
            attributes: ['id', 'title', 'star', 'createdAt']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const postCreatePostService = (body, userId) => new Promise(async (resolve, reject) => {
    let postId = v4()
    let attributesId = v4()
    let imagesId = v4()
    let overviewId = v4()
    let labelCode = generateCode(body.label) 
    let hashtag = Math.floor(Math.random()*Math.pow(10*6))
    let currentDate = generateDate()

    try {
        await db.Post.create({
            id: postId,
            title: body.title,
            labelCode,
            address: body.address || null,
            attributesId,
            categoryCode: body.categoryCode,
            description: JSON.stringify(body.description) || null,
            userId,
            overviewId,
            imagesId,
            areaCode: body.areaCode,
            priceCode: body.priceCode,
            provinceCode:body?.province.includes("Thành phố") ? generateCode(body?.province.includes("Thành phố")) : generateCode(body?.province.includes("Tỉnh")) || null,
            priceNumber: body.priceNumber,
            areaNumber: `${body.areaNumber}m2`
        })

        await db.Attribute.create({
            id: attributesId,
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng` : `${+body.priceNumber} triệu/tháng`,
            acreage: body.areaNumber,
            published: moment(new Date).format("DD/MM/YYYY") ,
            hashtag:`#${hashtag}`

        })

        await db.Image.create({
            id: imagesId,
            image: JSON.stringify(body.images)
        })

        await db.Overview.create({
            id: overviewId,
            code: hashtag,
            area: body.label,
            type: body.category,
            target: body.target,
            bonus: "Tin thường",
            created: currentDate.today,
            expired: currentDate.expireDay
        })

        await db.Province.findOrCreate({
            where:{
                [Op.or]:[
                    {value:body?.province?.replace("Thành phố ","")},
                    {value:body?.province?.replace("Tỉnh ","")}
                ]
            },
            defaults:{
                code:body?.province.includes("Thành phố") ? generateCode(body?.province.includes("Thành phố")) : generateCode(body?.province.includes("Tỉnh")),
                value: body?.province.includes("Thành phố") ? body?.province.includes("Thành phố") : body?.province.includes("Tỉnh"),
            }
        })

        await db.Label.findOrCreate({
            where:{
                code:labelCode
            },
            defaults:{
                code:labelCode,
                body:body.label
            }
        })
        resolve({
            err: 0,
            msg: 'Create posts is success.',
        })

    } catch (error) {
        reject(error)
    }
})


export const getPostsAdmin = (page,id,query) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query,userId:id }
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                { model: db.Overview, as: 'overviews', attributes: ['area', 'type', 'target','bonus','created','expired'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const putPostsAdmin = ({postId,overviewId,imagesId,attributesId,...body}) => new Promise(async (resolve, reject) => {
    try {
        let labelCode = generateCode(body.label) 
        await db.Post.update({
            title: body.title,
            labelCode,
            address: body.address || null,
            categoryCode: body.categoryCode,
            description: JSON.stringify(body.description) || null,
            areaCode: body.areaCode,
            priceCode: body.priceCode,
            provinceCode:body?.province.includes("Thành phố") ? generateCode(body?.province.includes("Thành phố")) : generateCode(body?.province.includes("Tỉnh")) || null,
            priceNumber: body.priceNumber,
            areaNumber: `${body.areaNumber}m2`
        },{
            where:{id:postId}
        })

        await db.Attribute.update({
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng` : `${+body.priceNumber} triệu/tháng`,
            acreage: body.areaNumber,
        },{
            where:{id:attributesId}
        })

        await db.Image.update({
            image: JSON.stringify(body.images)
        },{
            where:{id:imagesId}
        })

        await db.Overview.update({
            area: body.label,
            type: body.category,
            target: body.target,
        },{
            where:{id:overviewId}
        })

        await db.Province.findOrCreate({
            where:{
                [Op.or]:[
                    {value:body?.province?.replace("Thành phố ","")},
                    {value:body?.province?.replace("Tỉnh ","")}
                ]
            },
            defaults:{
                code:body?.province.includes("Thành phố") ? generateCode(body?.province.includes("Thành phố")) : generateCode(body?.province.includes("Tỉnh")),
                value: body?.province.includes("Thành phố") ? body?.province.includes("Thành phố") : body?.province.includes("Tỉnh"),
            }
        })

        await db.Label.findOrCreate({
            where:{
                code:labelCode
            },
            defaults:{
                code:labelCode,
                body:body.label
            }
        })

        resolve({
            err: 0,
            msg: 'Updated',
            response
        })

    } catch (error) {
        reject(error)
    }
})