const pagination = require('../../public/js/pages/pagination');
const billService = require('../services/billService');
const rulesService = require('../services/rulesService')
const e = require('express');


class sellingController{
    //[GET]: \bill
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
            const bill = await billService.list(title,month,page,itemPerPage)
            const TotalPage = Math.ceil(bill.count/itemPerPage) > page + 1 ? Math.ceil(bill.count/itemPerPage) : page + 1
            const pagItems = pagination.paginationFunc(page+1, TotalPage);
            res.render('bill/bill',{
                Items: pagItems,
                bill: bill.rows,
                message: req.query.message,
                title: title,
                chooseMonth: secondChooseMonth,
            })
        } else{
           res.redirect('/');
        }
    }
    //[POST]: /bill/add
    async add(req, res, next){
        try {
            req.body.MAPM = await billService.genKeyPM();
            req.body.MinBook = await rulesService.getSoldMin();
            const created = await billService.add(req);
            if(created){
                req.session.cart = {}
                return res.redirect('back');                
            }
            else {
                res.status(401).json("Lỗi! Kiểm tra thông tin nợ");
            }
        }
        catch(err){
            next(err)
        }

    };

    //[GET] bill/view/:id
    async view(req, res, next){
        if(req.user){
            if(req.user.LOAINV != 'emp') {
                try {
                    const MAPM = req.params.id;
                    const ct_pm = await billService.getInfor(MAPM)
                    const emp = await billService.getEmp(ct_pm.MANV)
                    var books = await billService.getImportDetail(MAPM)
                    for (let book of books.rows) {
                        book.THELOAI = ""
                        const sach = await billService.getBooks(book.MASACH)
                        book.TENSACH = sach[0].tensach
                        book.GIA = sach[0].gia
                        sach.forEach(theloai => {
                            book.THELOAI += theloai['theloaiofsaches.maTL_theloai.tenTL']
                            if (theloai != sach[sach.length - 1]) {
                                book.THELOAI += ', '
                            }
                        });
                        
                    }; 
                    const itemPerPage = 10;
                    const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
                    const title = req.query.title;
                    const TotalPage = Math.ceil(books.count/itemPerPage) > page + 1 ? Math.ceil(books.count/itemPerPage) : page + 1
                    const pagItems = pagination.paginationFunc(page+1, TotalPage);
                    res.render('bill/billDetail',{
                        ct_pm, emp, 
                        Items: pagItems,
                        title: title,
                        books: books.rows})
                } catch (error) {
                    next(error)
                }
            }
        } else{
            res.redirect('/');
        }
    }
}

module.exports= new sellingController;