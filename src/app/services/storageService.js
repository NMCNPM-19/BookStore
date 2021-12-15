const { models } = require("../../config/sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.list = (title,Month,page, itemPerPage) => {
    var condition = "";
    var secondCondition="";
    if (title) {
        condition = title;
    }
    if (Month){
        secondCondition=Month;
    }
    return models.tonkho.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    NGAYTHANG: {
                        [Op.like]: secondCondition,
                    },
                },
                {
                    masach: {
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
