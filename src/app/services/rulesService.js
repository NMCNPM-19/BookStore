const {models} = require('../../config/sequelize')

exports.getRules = async () => {
    return await models.rules.findOne({
        where: {Locker: 'X'},
        raw: true
    })
}

exports.getCurrMax = async () => {
    rules = await this.getRules()
    return rules.curr_quantity_max
}
exports.getCurrMin = async () => {
    rules = await this.getRules()
    return rules.curr_quantity_min
}
exports.getMinQuantity = async (emp) => {
    if (emp) {
        return 0;
    }
    rules = await this.getRules()
    return rules.import_min
}
exports.getSoldMin = async () => {
    rules = await this.getRules()
    return rules.curr_sale_min
}
exports.updateSave = async (req) => {
    const Rules = await models.rules.findOne();
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
    await Rules.save()
}