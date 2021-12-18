const importService = require('../services/orderService');
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
            req.body.MAPN = await orderService.genKeyPN();
            const created = await orderService.add(req);
            if(created){
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
            try {
                MAPN = req.params.id;
                const ct_pn = await orderService.getInfor(MAPN)
                const nxb = order.orderService.getNXB(MAPN)
                const emp = order.orderService.getEmp(MAPN)
                const books = await order.order.orderService.getBooks(MAPN)
                res.render('orders/importDetail',{ct_pn, nxb, emp})
            } catch (error) {
                next(error)
            }
        } else{
            res.redirect('/');
        }
    }
}

module.exports = new orderController