const importService = require('../services/importService');
const pagination = require('../../public/js/pages/pagination');


class orderController{
    //[GET]: /products/
    async list(req, res, next){
        if(req.user){
            if(req.user.LOAINV != 'emp') {
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

                const itemPerPage = 10;
                const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
                const title = req.query.title
                const order = await importService.list(title,month, page,itemPerPage);
                const TotalPage = Math.ceil(order.count/itemPerPage) > page + 1 ? Math.ceil(order.count/itemPerPage) : page + 1
                const pagItems = pagination.paginationFunc(page+1, TotalPage);
                console.log(order);
                res.render('orders/import', {
                    Items: pagItems,
                    order: order.rows,
                    title: title,
                    chooseMonth: secondChooseMonth,
                });
            }
        } else{
            res.redirect('/');
        }

    }

    //[POST]:importOrder/add
    async add(req, res, next){
        try {
            req.body.MAPN = await importService.genKeyPN();
            const created = await importService.add(req);
            if(created){
                req.session.cart = {}
                return res.redirect('back');                
            }
            else {
                res.status(401).json("Lỗi! Kiểm tra số lượng nhập");
            }
        }
        catch(err){
          next(err)
        }

    };

    //[GET] importOrder/view/:id
    async view(req, res, next){
        if(req.user){
            // if(req.user.LOAINV != 'emp') {
                try {
                    const MAPN = req.params.id;
                    const ct_pn = await importService.getInfor(MAPN)
                    const emp = await importService.getEmp(ct_pn.MANV)
                    var books = await importService.getImportDetail(MAPN)
                    for (let book of books.rows) {
                        book.THELOAI = ""
                        const sach = await importService.getBooks(book.MASACH)
                        book.TACGIA = sach[0].tacgia
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
                    res.render('orders/importDetail',{
                        ct_pn, emp, 
                        Items: pagItems,
                        title: title,
                        books: books.rows})
                } catch (error) {
                    next(error)
                }
            //}
        } else{
            res.redirect('/');
        }
    }
}

module.exports = new orderController