const {models, sequelize} = require('../../config/sequelize')
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
    try {
        return await sequelize.transaction(async (t) => {
            let date=new Date;
            const phieunhap = await models.phieunhap.create({
                
                MAPN: req.body.MAPN,
                NGAYNHAP : date,
                MANV : req.user.MANV,
            
            }, {transaction: t});
            for (var i = 0; i < req.body.masach.length; i++) {
                await models.ct_phieunhap.create({
                    MAPN: req.body.MAPN,
                    MASACH: req.body.masach[i],
                    SL: req.body.SL[i]
                }, {transaction: t})
            }
        })
    } catch (err) {
        console.log('queries failed', err);
    }
}
exports.getInfor= async (MAPN) =>{
    return await models.phieunhap.findOne({ where: { MAPN: MAPN } , raw : true});
}
exports.getBooks = async (MAPN) => {
    return await models.ct_phieunhap.findAll({where: {MAPN: MAPN}, raw : true})
}

exports.getEmp = async (nvID) =>{
    return await models.nhanvien.findOne({where: {MANV: nvID}}, raw = true)
}

exports.genKeyPN = async () => {
    var order = await models.phieunhap.findAll({});
    var i = 1;
    var check = true;
    var str;
    while (true) {
      check = true;
      str = '' + i;
      while (str.length < 5) {
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