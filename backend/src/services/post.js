import db from '../models'
const { Op } = require("sequelize");
import { v4 } from 'uuid'
import generateCode from '../utils/generateCode'
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
    console.log(priceNumber)
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }
     
        if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber }
        if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber }
        console.log(queries)
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
    let userId = userId
    let labelCode = generateCode(body.label).trim()
    let hashtag = Math.floor(Math.random()*Math.pow(10*6))
    let currentDate = new Date()

    try {
        await db.Post.create({
            id: postId,
            title: body.title,
            labelCode,
            address: body.address || null,
            attributesId,
            categoryCode: body.categoryCode,
            description: body.description || null,
            userId,
            overviewId,
            imagesId,
            areaCode: body.areaCode,
            priceCode: body.priceCode,
            provinceCode:body.provinceCode,
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber
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
            created: currentDate,
            expired: currentDate.setDate(currentDate.getDate()+10),
        })
        await db.Province.findOrCreate({
            where:{
                [Op.or]:[
                    {vaule:body?.province?.replace("Thành phố ","")},
                    {vaule:body?.province?.replace("Tỉnh ","")}
                ]
            },
            default:{
                code:body?.province.includes("Thành phố") ? generateCode(body?.province.includes("Thành phố")) : generateCode(body?.province.includes("Tỉnh")),
                vaule: body?.province.includes("Thành phố") ? body?.province.includes("Thành phố") : body?.province.includes("Tỉnh"),
            }
        })

        await db.Label.findOrCreate({
            where:{
                code:labelCode
            },
            default:{
                code:labelCode,
                body:body.label
            }
        })
        resolve({
            err: 0,
            msg: 'Create posts is failed.',
        })

    } catch (error) {
        reject(error)
    }
})