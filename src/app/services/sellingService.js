const { models } = require("../../config/sequelize");
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
    return models.tonno.findAndCountAll({
        where: {
            [Op.or]: [
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
};
