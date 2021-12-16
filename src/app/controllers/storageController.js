const pagination = require('../../public/js/pages/pagination');
const storageService = require('../services/storageService');
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize');
const e = require('express');


class storageController{
    //[GET]:\storage
    async list(req, res, next){
       if(req.user){
            const itemPerPage = 10;
            const title = req.query.title;
            let chooseMonth=req.query.chooseMonth;
            let secondChooseMonth=chooseMonth;
            var month;
            if (chooseMonth){
                month=chooseMonth.split("-");
                month=month.join('');
            }
            else {
                let date=new Date;
                month=date.getFullYear().toString()+"-"+(date.getMonth()+1).toString();
                console.log(date.getMonth());
                console.log(month);
                secondChooseMonth=month;
            }
                
            console.log(month);
            const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
            const storageBook = await storageService.list(title,month,page,itemPerPage)
            const TotalPage = Math.ceil(storageBook.count/itemPerPage) > page + 1 ? Math.ceil(storageBook.count/itemPerPage) : page + 1
            const pagItems = pagination.paginationFunc(page+1, TotalPage);
            res.render('storage',{
                Items: pagItems,
                storageBook: storageBook.rows,
                message: req.query.message,
                title: title,
                chooseMonth: secondChooseMonth,
            })
        } else{
            res.redirect('/');
        }
    }
}

module.exports=new storageController;