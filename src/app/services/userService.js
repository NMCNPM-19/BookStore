const bcrypt = require("bcrypt");
const {models} = require('../../config/sequelize')


//User profile
exports.viewProfile = async (req) => {
    const profile = await models.nhanvien.findOne({ where: {MANV: req.user.MANV}, raw: true })
    if (!profile) {
        return
    }
    return profile;
}

//User password
exports.changePasswd = async (req) => {
    if (req.body.newPasswd !== req.body.reNewPasswd) {
        return "Unmatch password";
    }
    const account = await models.nhanvien.findOne({
        where: { MANV: req.params.id }, 
        raw: true
    });
    const match = await validPassword(account, req.body.currPasswd);
    if (!match) {
        return "Incorrect password"
    }
    hashPasswd = await bcrypt.hash(req.body.newPasswd, 10);
    await models.nhanvien.update(
        {PASS: hashPasswd},
        {where: {MANV: account.MANV}}        
    )
    return "Success"
}

function validPassword(user, password){
    return bcrypt.compare(password, user.PASS);
}