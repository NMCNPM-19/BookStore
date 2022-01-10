//const { options, report } = require('.');
const {models} = require('../../config/sequelize')
const cloudImage = require('../middlewares/uploadIMG/cloudinary');
const { Op } = require('sequelize');
exports.getTL = () =>{
        return models.theloai.findAll({})
}


exports.list = (title , page, itemPerPage) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    return models.sach.findAndCountAll({ 
        offset: page*itemPerPage, 
        limit: itemPerPage, 
        raw: true ,
        where: {
            tensach :{
                [Op.like]: '%' + condition + '%',
            }
        }
});
};  

exports.getNXB = () =>{
    return models.nxb.findAll({})
}
exports.genKeybook = async () => {
    var books = await models.sach.findAll({paranoid: false,});
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
    
    const h =  await models.sach.findOrCreate({
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
    if (req.body.category) {
      for (const i of req.body.category) {
          await models.theloaiofsach.create({
            masach: req.body.masach,
            maTL: i,
      })
      };
    }
    
    return h;
}
exports.update = (req) => {
    return models.sach.findOne({
        where: {
            masach: req.params.id
        },
    });
}
exports.saveUpdate = async(req) => {
    const book = await models.sach.findOne({where: {masach: req.params.id}});
    if(req.file){
        var result
        if(book.IMAGE_PUBLICID){
            result = await cloudImage.updateIMG(req.file.path, book.IMAGE_PUBLICID);
        }else{
            result = await cloudImage.uploadIMG(req.file.path);
        }
        req.body.IMAGE = result.secure_url
        req.body.IMAGE_PUBLICID = result.public_id
    }

    await models.theloaiofsach.destroy({
      where: {masach : req.params.id}
    })

    if (req.body.category) {
      req.body.category.forEach(async (element) => {
        await models.theloaiofsach.create({
          masach: req.params.id,
          maTL: element,
        });
      });
    }
    book.set(req.body)
    await book.save()
}
exports.saveDelete = async (req) => {
    const book = await models.sach.findOne({where: {masach: req.params.id}});
    var link = book.IMAGE_PUBLICID
    if(link){
        await cloudImage.deleteIMG(link);
    }
    await book.destroy()
}

exports.getBooks = (title) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    return models.sach.findAll({
      where: {
        tensach: {
          [Op.like]: '%' + condition + '%',
        },
      },
    });
  };

exports.catofbook = (req) => {
  return models.theloaiofsach.findAll({where: { masach : req.params.id} , raw: true})
}