const {models, sequelize}  = require("../../config/sequelize");
const { Op } = require("sequelize");


exports.list = (title,Month,page, itemPerPage,MANV) => {
    var condition = "";
    var secondCondition="";
    if (title) {
        condition = title;
    }
    if (Month){
        secondCondition=Month.split('-');
    }
    var manvcondition = '';
    if(MANV.slice(0,3) == 'emp'){
        manvcondition = MANV
    }
    return models.phieumua.findAndCountAll({
        where: { 
            [Op.and]:[{
                [Op.and]: [
                    {
                        [Op.and]: [
                            sequelize.where(sequelize.fn('YEAR', sequelize.col('`phieumua`.`NGAYMUA`')), secondCondition[0]),
                            sequelize.where(sequelize.fn('MONTH', sequelize.col('`phieumua`.`NGAYMUA`')), secondCondition[1])
                        ]
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
exports.getBillDetail = async (MAPM, title, page, itemPerPage) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    return await models.ct_phieumua.findAndCountAll(
        {where: {
            [Op.and]: [
                {
                    MAPM: MAPM
                },
                {
                    MASACH: {
                        [Op.like]: "%" + condition + "%",
                    },
                }
            ]
            },
        raw : true,
        offset: page*itemPerPage, 
        limit: itemPerPage, 
    })
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
exports.getBookInfor = async (books_rows) => {
    for (let book of books_rows) {
        book.THELOAI = ""
        const sach = await this.getBooks(book.MASACH)
        book.TENSACH = sach[0].tensach
        book.GIA = sach[0].gia
        sach.forEach(theloai => {
            book.THELOAI += theloai['theloaiofsaches.maTL_theloai.tenTL']
            if (theloai != sach[sach.length - 1]) {
                book.THELOAI += ', '
            }
        });        
    }
    return books_rows;
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