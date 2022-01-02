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
exports.getquantityBook = async(masach) => {
    let date=new Date;
    var month=date.getFullYear().toString()+"-"+('0' + (date.getMonth()+1).toString()).slice(-2);
    month=month.split("-");
    month=month.join('');
    return await models.tonkho.findOne({where: { 
        masach: masach,
        NGAYTHANG:month,
    },raw: true})
}