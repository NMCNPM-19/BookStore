const {models} = require('../../config/sequelize');
const bcrypt = require('bcrypt'); 


exports.list = (page, itemPerPage) => {
    return models.nhanvien.findAndCountAll({ offset: page*itemPerPage, limit: itemPerPage, raw: true });
};  


exports.add = async(user, password, role) => {
    const account = await models.nhanvien.findOne({ where: {USER: user}, raw: true });
    if(account){
        return null;
    }
    const manv= await genKeyAccount(role);
    const hashPassword = await bcrypt.hash(password, 10);
    return models.nhanvien.create({
        MANV: manv,
        USER: user,
        PASS: hashPassword,
        ROLE: role
    });
}

genKeyAccount = async (role) => {
    var accounts = await models.nhanvien.findAll({});
    var i = 1;
    var check = true;
    var str;
    while (true) {
      check = true;
      str = '' + i;
      while (str.length < 3) {
        str = 0 + str;
      }
      
      s_key = role + str;
      for (let index = 0; index < accounts.length; index++) {
        if (accounts[index]['MANV'] === s_key) {
          check = false;
          break;
        }
      }
      if (check) {
        return s_key;
      }
      i++;
    }
  };