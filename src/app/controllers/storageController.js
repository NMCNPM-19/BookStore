const pagination = require('../../public/js/pages/pagination');
const storageService = require('../services/storageService');
const {multipleSequelizeToObject,SequelizeToObject} = require('../../util/sequelize');
const e = require('express');

// dùng để in csv
const CsvParser = require("json2csv").Parser;

class storageController{
    //[GET]:\storage
    async list(req, res, next){
       if(req.user){
        if(req.user.LOAINV != 'emp') {
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
                month=date.getFullYear().toString()+"-"+('0' + (date.getMonth()+1).toString()).slice(-2);
                secondChooseMonth=month;
                month=month.split("-");
                month=month.join('');
            }
  
           
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
                amount: storageBook.count,
            })
        }
        } else{
            res.redirect('/');
        }
    }


    async printMonth(req, res, next){
        if(req.user){
            if(req.user.LOAINV != 'emp') {
             let chooseMonth=req.query.chooseMonth;
             var month;
             if (chooseMonth){
                 month=chooseMonth.split("-");
                 month=month.join('');
             }
             else {
                 let date=new Date;
                 month=date.getFullYear().toString()+"-"+('0' + (date.getMonth()+1).toString()).slice(-2);
                 
             }
                 
             
             let printTable = [];
             const storageBook = await storageService.listMonth(month);
            
            storageBook.forEach(element => {
                const {masach,SLDau,SLCuoi,Tongnhap,Tongxuat} =element;
                printTable.push( {masach,SLDau,SLCuoi,Tongnhap,Tongxuat})
            });
            
            const csvFields = ["Masach", "SLdau", "SLcuoi", "Tongnhap","Tongxuat"];
            const csvParser = new CsvParser({ csvFields });
            let csvData=[];
            if (printTable){
                csvData = csvParser.parse(printTable);
            }

            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=Tonkho.csv");
            res.status(200).end(csvData);
        }
         } else{
             res.redirect('/');
         }
     }
}

module.exports=new storageController;