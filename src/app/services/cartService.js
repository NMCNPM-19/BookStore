const { models } = require("../../config/sequelize");
const { Op } = require("sequelize");

exports.getSachs = async() => {
 return await models.sach.findAll({})
}
exports.getSachbyID = async(masach) => {
    return await models.sach.findOne({
        where: {
            masach
        },
        raw : true 
    })
}
exports.getlistCust = async() => {
    return await models.khachhang.findAll({raw: true})
}