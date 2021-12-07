const {models} = require('../../config/sequelize');
const bcrypt = require('bcrypt'); 


exports.list = (page, itemPerPage) => {
    return models.account.findAndCountAll({ offset: page*itemPerPage, limit: itemPerPage, raw: true });
};  


exports.add = async(email, password) => {
    const user = await models.account.findOne({ where: {EMAIL: email}, raw: true });
    if(user){
        return null;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    return models.account.create({
        EMAIL: email,
        PASSWORD: hashPassword,
        ROLE: 'Admin'
    });
}