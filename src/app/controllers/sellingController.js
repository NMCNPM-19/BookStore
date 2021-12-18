const pagination = require('../../public/js/pages/pagination');
const sellingService = require('../services/sellingService');
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize');
const e = require('express');


class sellingController{
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
                secondChooseMonth=month;
            }
            const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
            const sellings = await sellingService.list(title,month,page,itemPerPage)
            const TotalPage = Math.ceil(sellings.count/itemPerPage) > page + 1 ? Math.ceil(sellings.count/itemPerPage) : page + 1
            const pagItems = pagination.paginationFunc(page+1, TotalPage);
            res.render('selling/selling',{
                Items: pagItems,
                sellings: sellings.rows,
                message: req.query.message,
                title: title,
                chooseMonth: secondChooseMonth,
            })
        } else{
           res.redirect('/');
        }
    }
}

module.exports= new sellingController;