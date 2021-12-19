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