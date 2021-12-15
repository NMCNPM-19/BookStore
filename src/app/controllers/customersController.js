const customerService = require('../services/customersService');
const pagination = require('../../public/js/pages/pagination');

class customerController{
    //[GET]:customers/
     async list(req, res, next){
        if(req.user){
            const itemPerPage = 10;
            const title = req.query.title;
            const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
            const customers = await customerService.list(title,page,itemPerPage)
            const TotalPage = Math.ceil(customers.count/itemPerPage) > page + 1 ? Math.ceil(customers.count/itemPerPage) : page + 1
            const pagItems = pagination.paginationFunc(page+1, TotalPage);
            const counter = await customerService.countBin()
            res.render('customer/editCustomer', {
                Items: pagItems,
                customers: customers.rows,
                message: req.query.message,
                counter,
                title: title,
            });
        } else{
            res.redirect('/');
        }
    }
    //[POST]:customers/add
     async add(req, res , next){
        try {
            const customer = await customerService.add(req);
            res.redirect('/customers?message=' + customer)
        }
        catch(err){
            var message =  'Something went wrong !!! Try again!'
            res.redirect('/customers?message=' + message)
        }
    }
    
    //[DELETE]:customers/:id/del
    async delete(req, res, next) {
        try {
            await customerService.softDelete(req)
            res.redirect('/customers')
        } catch (error) {
            next(error);
        }
    }
    //[GET]:customers/recyclebin
    async recyclebin(req, res, next){
        // if(req.user){
            const itemPerPage = 10;
            const title = req.query.title;
            const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
            const customers = await customerService.binList(title, page,itemPerPage);
            const TotalPage = Math.ceil(customers.count/itemPerPage) > page + 1 ? Math.ceil(customers.count/itemPerPage) : page + 1
            const pagItems = pagination.paginationFunc(page+1, TotalPage);
            

            res.render('customer/binCustomer', {
                Items: pagItems,
                customers: customers.rows,
                message: req.query.message,
                title: title,
            });
        // } else{
        //     res.redirect('/');
        // }
    }

    //[PATCH]:customers/:id/restore
    async restore(req, res, next){
        try {
            await customerService.Restore(req.params.id)
            res.redirect('/customers')
        } catch (error) {
            next(error)
        }
    }

    //[DELETE]:customers/:id/destroy
    async destroy(req, res, next){
        try {
            await customerService.destroyDelete(req.params.id)
            res.redirect('back')
        } catch (error) {
            next(error)
        }
    }
    //[GET]:customers/:id/edit
    async edit(req, res, next){
        try {
            var admin = await customerService.getInfor(req.params.id)      
            res.render('customer/inforCustomer',{admin})
        } catch (error) {
            next(error)
        }
    }
    //[POST]:customers/:id/edit
    async update(req, res, next){
        try {
            await customerService.updateSave(req)
            res.redirect('back')
        } catch (error) {
            next(error)
        }
    }


}



module.exports = new customerController