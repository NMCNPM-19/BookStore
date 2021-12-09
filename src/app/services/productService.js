//const { options, report } = require('.');
const {models} = require('../../config/sequelize')
const cloudImage = require('../middlewares/uploadIMG/cloudinary');

exports.getTL = () =>{
        return models.theloai.findAll({})
}


exports.list = (page, itemPerPage) => {
    return models.sach.findAndCountAll({ offset: page*itemPerPage, limit: itemPerPage, raw: true });
};  

exports.getNXB = () =>{
    return models.nxb.findAll({})
}
exports.genKeybook = async () => {
    var books = await models.sach.findAll({});
    var i = 1;
    var check = true;
    var str;
    while (true) {
      check = true;
      str = '' + i;
      while (str.length < 6) {
        str = 0 + str;
      }
      s_key = str;
      for (let index = 0; index < books.length; index++) {
        if (books[index]['masach'] === s_key) {
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

exports.store = async(req) => {
    const result = await cloudImage.uploadIMG(req.file.path);
    
    return models.sach.findOrCreate({
        where: {
            masach: req.body.masach,
            tensach : req.body.tensach,
            tacgia : req.body.tacgia,
            ngayXB : req.body.ngayXB,
            manxb : req.body.manxb,
            MOTA : req.body.MOTA,
            gia : req.body.gia,
            SL: 0,
            IMAGE: result.secure_url,
            IMAGE_PUBLICID: result.public_id
        }
    });
}
exports.update = (req) => {
    return models.sach.findOne({
        where: {
            masach: req.params.id
        },
    });
}
exports.saveUpdate = async(req) => {
    if(req.file){
        const book = await models.sach.findOne({where: {masach: req.params.id}});
        var result
        if(book.IMAGE_PUBLICID){
            result = await cloudImage.updateIMG(req.file.path, book.IMAGE_PUBLICID);
        }else{
            result = await cloudImage.uploadIMG(req.file.path);
        }
        req.body.atUpdated = Date.now(),
        req.body.IMAGE = result.secure_url,
        req.body.IMAGE_PUBLICID = result.public_id
        book.set(req.body)
        await book.save()
    }
}
exports.saveDelete = async (req) => {
    const book = await models.sach.findOne({where: {masach: req.params.id}});
    var link = book.IMAGE_PUBLICID
    if(link){
        await cloudImage.deleteIMG(link);
    }
    await book.destroy()
}



