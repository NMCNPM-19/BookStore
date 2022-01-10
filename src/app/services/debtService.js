const { models } = require("../../config/sequelize");
const { Op } = require("sequelize");

exports.list = (title, Month, page, itemPerPage) => {
    var condition = title;
    var secondCondition = "";

    if (Month) {
        secondCondition = Month;
    }
    if (condition) {
        return models.tonno.findAndCountAll({
            where: {
                [Op.and]: [
                    {
                        NGAYTHANG: {
                            [Op.like]: secondCondition,
                        },
                    },
                    {
                        MAKH: {
                            [Op.like]: "%" + condition + "%",
                        },
                    },
                ],
            },
            offset: page * itemPerPage,
            limit: itemPerPage,
            raw: true,
        });
    } else {
        return models.tonno.findAndCountAll({
            where: {
                NGAYTHANG: {
                    [Op.like]: secondCondition,
                },
            },
            offset: page * itemPerPage,
            limit: itemPerPage,
            raw: true,
        });
    }
};

exports.listMonth = (Month) => {
    var secondCondition = "";
    if (Month) {
        secondCondition = Month;
    }
    return models.tonno.findAll({
        where: {
            [Op.or]: [
                {
                    NGAYTHANG: {
                        [Op.like]: secondCondition,
                    },
                },
            ],
        },
        raw: true,
    });
};

exports.updateDebtNew = async(MAKH) => {
    let date = new Date();
    month =date.getFullYear().toString() + "-" + ('0' + (date.getMonth()+1).toString()).slice(-2);
    month = month.split("-");
    month = month.join("");
    var timeHere = month;
    var nowDebt = await models.tonno.findAndCountAll({
        where: {
            [Op.and]: [
                {
                    NGAYTHANG: timeHere,
                },
                {
                    MAKH: MAKH,
                },
            ],
        },
    });
    
    if(nowDebt.count == 0){
        var nam = timeHere.slice(0,4)
        var thang = timeHere.slice(4) - 1
        if(thang < 1){
            nam = nam - 1
            thang = 12
        }
        if(thang.toString.length < 2){
            thang = '0' + thang
        }

        var namthang = nam + thang
        var preDebt = await models.tonno.findAndCountAll({
            where: {
                [Op.and]: [
                    {
                        NGAYTHANG: namthang,
                    },
                    {
                        MAKH: MAKH,
                    },
                ],
            },
        });
        
        await models.tonno.create({
            MAKH : MAKH,
            NGAYTHANG: timeHere,
            nodau : preDebt.nocuoi,
            nocuoi :preDebt.nocuoi,
            tongno :0,
            tongtra:0,
        })
    }

};

exports.getCustomer = async (req) => {
    return await models.khachhang.findOne({ where: { MAKH: req.params.id } });
};

genKeyAdd = async (role) => {
    var debt = await models.nophaitra.findAll({paranoid: false,});
    var i = 1;
    var check = true;
    var str;
    while (true) {
        check = true;
        str = "" + i;
        while (str.length <= 3) {
            str = 0 + str;
        }
        s_key = role + str;
        for (let index = 0; index < debt.length; index++) {
            if (debt[index]["MaNoPT"] === s_key) {
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

genKeyPay = async (role) => {
    var debt = await models.nodatra.findAll({});
    var i = 1;
    var check = true;
    var str;
    while (true) {
        check = true;
        str = "" + i;
        while (str.length <= 3) {
            str = 0 + str;
        }
        s_key = role + str;
        for (let index = 0; index < debt.length; index++) {
            if (debt[index]["MaNoDT"] === s_key) {
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

exports.addDebt = async (req) => {
    var key = await genKeyAdd('PT')
    var debt = await models.nophaitra.create({
        MaNoPT : key,
        MANV :req.user.MANV,
        MAKH :req.params.id,
        sono: req.body.sono,
        ngayno: req.body.ngayno,
    })
}

exports.payDebt = async (req) => {
    var key = await genKeyPay('DT')
    await this.updateDebtNew(req.params.id)
    var debt = await models.nodatra.create({
        MaNoDT : key,
        MAKH :req.params.id,
        sotien: req.body.sotien,
        ngaytra: req.body.ngaytra,
    })
}

exports.debtCust = async (req) => {
    let date = new Date();
    month =date.getFullYear().toString() + "-" + ('0' + (date.getMonth()+1).toString()).slice(-2);
    month = month.split("-");
    month = month.join("");
    console.log(month);
    var timeHere = month;
    return await models.tonno.findOne({ where: { MAKH: req.params.id  , NGAYTHANG : timeHere} });
}
exports.ruleDebt = () => {
    return models.rules.findOne({where: {Locker : 'X'}})
}

exports.getListdebt = async (title,page,itemPerPage) => {
    var condition = '';
    if (title) {
      condition = title;
    }
   var rows = await models.nophaitra.findAll({
        include:[{
            model: models.khachhang,
            as: 'MAKH_khachhang',
            where: {
                [Op.or]:[{
                    HOTEN :{
                        [Op.like]: "%" + condition + "%",
                    }
                },{
                    MAKH: {
                        [Op.like]: "%" + condition + "%",
                    }
                }
            ]
            }
        }],
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true
    });
    const counts = rows.length
    return {counts, rows}
}
exports.getListPay = async (title,page,itemPerPage) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    var rows = await models.nodatra.findAll({
        include:[{
            model: models.khachhang,
            as: 'MAKH_khachhang',
            where: {
                [Op.or]: [
                    {
                        HOTEN: {
                            [Op.like]: "%" + condition + "%",
                        },
                    },
                    {
                        MAKH: {
                            [Op.like]: "%" + condition + "%",
                        },
                    },{
                        
                    }
                ],
            },
        }],
        offset: page * itemPerPage,
        limit: itemPerPage,
        raw: true
    });
    const count = rows.length
    return {count,rows}
}
