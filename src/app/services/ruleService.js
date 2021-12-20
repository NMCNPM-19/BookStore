const { models } = require("../../config/sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const cloudImage = require("../middlewares/uploadIMG/cloudinary");

exports.getRule=()=>{
    return models.rules.findOne({
        raw:true,
    })
}

exports.updateSave = async (req) => {
    const Rules = await models.rules.findOne();

    req.body.import_min=Number(req.body.import_min);
    req.body.curr_quantity_max=Number(req.body.curr_quantity_max);
    req.body.dept_min=Number(req.body.dept_min);
    req.body.dept_min=Number(req.body.dept_min);
    req.body.curr_sale_min=Number(req.body.curr_sale_min);
    req.total_cost_exceed_debt=Number(req.body.total_cost_exceed_debt);
    Rules.set(req.body)
    console.log(req.body);
    await Rules.save()
}