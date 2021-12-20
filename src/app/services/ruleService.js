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
    console.log("Body trước");
    console.log(req.body);
    req.body.import_min=Number(req.body.import_min);
    req.body.curr_quantity_max=Number(req.body.curr_quantity_max);
    req.body.dept_min=Number(req.body.dept_min);
    req.body.curr_sale_min=Number(req.body.curr_sale_min);
    if (req.body.total_cost_exceed_debt){
        req.body.total_cost_exceed_debt=Number(req.body.total_cost_exceed_debt)
    }
    else{
        req.body.total_cost_exceed_debt=Number(0)
    }
    Rules.set(req.body);
    console.log(req.body);
    await Rules.save()
}