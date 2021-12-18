const {models} = require('../../config/sequelize')
const { Op } = require("sequelize");


exports.list = (title,Month,page, itemPerPage) => {
    var condition = "";
    var secondCondition="";
    if (title) {
        condition = title;
    }
    if (Month){
        secondCondition=Month;
    }
    return models.phieunhap.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    NGAYNHAP: {
                        [Op.like]: secondCondition,
                    },
                },
                {
                    MAPN: {
                        [Op.like]: "%" + condition + "%",
                    },
                },
            ],
        },
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true,
    });
};

exports.add = async(req) => {
    for (var item in req.body.item) {
        models.ct_phieunhap.Create({
            MAPN: req.body.MAPN,
            MASACH: item.MASACH,
            SL: item.SL
        })
    }
    return models.phieunhap.Create({
        
        MAPN: req.body.MAPN,
        NGAYNHAP : req.body.NGAYNHAP,
        MANXB : req.body.MANXB,
        MANV : req.body.MANV,
    
    });
}
exports.getInfor= async (MAPN) =>{
    return await models.phieunhap.findOne({ where: { MAPN: MAPN } , raw : true});
}
exports.getBooks = async (MAPN) => {
    return await models.ct_phieunhap.findAll({where: {MAPN: MAPN}, raw : true})
}
exports.getNXB = (nxbID) =>{
    return models.nxb.findOne({where: {manxb: nxbID}}, raw = true)
}
exports.getEmp = (nvID) =>{
    return models.nhanvien.findOne({where: {MANV: nvID}}, raw = true)
}

exports.genKeyPN = async () => {
    var order = await models.phieunhap.findAll({});
    var i = 1;
    var check = true;
    var str;
    while (true) {
      check = true;
      str = '' + i;
      while (str.length < 6) {
        str = 0 + str;
      }
      s_key = str;
      for (let index = 0; index < order.length; index++) {
        if (order[index]['MAPN'] === s_key) {
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