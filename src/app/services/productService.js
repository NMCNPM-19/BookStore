//const { options, report } = require('.');
const {models} = require('../../config/sequelize')
const cloudImage = require('../middlewares/uploadIMG/cloudinary');



exports.list = (page, itemPerPage) => {
    return models.sach.findAndCountAll({ offset: page*itemPerPage, limit: itemPerPage, raw: true });
};  

exports.hiden = (req) => {
    return models.sach.update(
        {
            STATUS: 'Hiden'
        },
        { where: { MASACH: req.params.id } }
    );
}

exports.active = (req) => {
    return models.sach.update(
        {
            STATUS: 'Active'
        },
        { where: { MASACH: req.params.id } }
    );
}

exports.store = async(req) => {
    const result = await cloudImage.uploadIMG(req.file.path);
    return models.sach.findOrCreate({
        where: {
            TENSACH: req.body.name,
            LOAISACH: req.body.type,
            GIA: req.body.price,
            IMAGE: result.secure_url,
            IMAGE_PUBLICID: result.public_id
        }
    });
}

exports.update = (req) => {
    return models.sach.findOne({
        where: {
            MASACH: req.params.id
        },
    });
}

exports.saveUpdate = async(req) => {
    if(req.file){
        const book = await models.sach.findOne({where: {MASACH: req.params.id}});
        const result = await cloudImage.updateIMG(req.file.path, book.IMAGE_PUBLICID);
        return models.sach.update(
            {
                MASACH: req.body.id,
                TENSACH: req.body.name,
                LOAISACH: req.body.type,
                GIA: req.body.price,
                IMAGE: result.secure_url,
                IMAGE_PUBLICID: result.public_id
            },
            { where: { MASACH: req.params.id } }
        ); 
    }
    return models.sach.update(
        {
            MASACH: req.body.id,
            TENSACH: req.body.name,
            LOAISACH: req.body.type,
            GIA: req.body.price,
        },
        { where: { MASACH: req.params.id } }
    );
}
