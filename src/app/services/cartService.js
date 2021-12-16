const { models } = require("../../config/sequelize");


exports.getSachs = async() => {
 return await models.sach.findAll({})
}
exports.getSachbyID = async(masach) => {
    return await models.sach.findOne({
        where: {masach},
        raw : true 
    })
}