const {models, sequelize}  = require("../../config/sequelize");
const { Op } = require("sequelize");


exports.list = (title,Month,page, itemPerPage,MANV) => {
    var condition = "";
    var secondCondition="";
    if (title) {
        condition = title;
    }
    if (Month){
        secondCondition=Month;
    }
    var manvcondition = '';
    if(MANV.slice(0,3) == 'emp'){
        manvcondition = MANV
    }
    return models.phieumua.findAndCountAll({
        where: { 
            [Op.and]:[{
                [Op.or]: [
                    {
                        NGAYMUA: {
                            [Op.like]: secondCondition,
                        },
                    },
                    {
                        MAPM: {
                            [Op.like]: "%" + condition + "%",
                        },
                    },
                ],
            },{
                MANV:{
                    [Op.like]: "%" + manvcondition + "%",
                }
            }]
        },
            offset: page * itemPerPage,
            limit: itemPerPage,
            raw: true,
        });
};

exports.add = async(req) => {
    try {
        await sequelize.transaction(async (t) => {
            let date=new Date;
            const phieumua = await models.phieumua.create({
                MAKH: req.body.MAKH,
                MAPM: req.body.MAPM,
                NGAYMUA : date,
                MANV : req.user.MANV,
            
            }, {transaction: t});
            if (!Array.isArray(req.body.masach)) {
                await models.ct_phieumua.create({
                    MAPM: req.body.MAPM,
                    MASACH: req.body.masach,
                    SL: req.body.SL
                }, {transaction: t})
            }
            else {
                for (var i = 0; i < req.body.masach.length; i++) {
                    await models.ct_phieumua.create({
                        MAPM: req.body.MAPM,
                        MASACH: req.body.masach[i],
                        SL: req.body.SL[i]
                    }, {transaction: t})
                }
            }
        })
        return true
    } catch (err) {
        console.log('queries failed', err);
    }
}
exports.getInfor = async (MAPM) =>{
    return await models.phieumua.findOne({ where: { MAPM: MAPM } , raw : true});
}
exports.getImportDetail = async (MAPM) => {
    return await models.ct_phieumua.findAndCountAll({where: {MAPM: MAPM}, raw : true})
}
exports.getBooks = async (MASACH) => {
    return await models.sach.findAll({ 
        where: { masach: MASACH },
        include: [{
            model: models.theloaiofsach, 
            as: 'theloaiofsaches',
            include: [{
                model: models.theloai,
                as: 'maTL_theloai'
            }]
        }],
        raw : true});
}
exports.getEmp = async (nvID) =>{
    return await models.nhanvien.findOne({where: {MANV: nvID}, raw : true})
}

exports.genKeyPM = async () => {
    var order = await models.phieumua.findAll({});
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
        if (order[index]['MAPM'] === s_key) {
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