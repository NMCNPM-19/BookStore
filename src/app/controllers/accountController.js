const accountService = require('../services/accountService');
const pagination = require('../../public/js/pages/pagination');

class AccountController{
    //[GET]:accounts/
     async list(req, res, next){
        if(req.user){
            if(req.user.LOAINV = 'adm') {
                const itemPerPage = 10;
                const title = req.query.title;
                const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
                const accounts = await accountService.list(title,page,itemPerPage);
                const TotalPage = Math.ceil(accounts.count/itemPerPage) > page + 1 ? Math.ceil(accounts.count/itemPerPage) : page + 1
                const pagItems = pagination.paginationFunc(page+1, TotalPage);
                const counter = await accountService.countBin()
                res.render('accounts/editAccount', {
                    Items: pagItems,
                    accounts: accounts.rows,
                    message: req.query.message,
                    counter,
                    title: title,
                });
            }
        } else{
            res.redirect('/');
        }
    }
    //[POST]:accounts/add
     async add(req, res , next){
        try {
            const account = await accountService.add(req);
            res.redirect('/accounts?message='+account)
        }
        catch(err){
            return res.render('accounts/editAccount',{message: 'Something went wrong !!! Try again!'});
        }
    }
    
    //[DELETE]:accounts/:id/del
    async delete(req, res, next) {
        try {
            await accountService.softDelete(req)
            res.redirect('/accounts')
        } catch (error) {
            next(error);
        }
    }
    //[GET]:accounts/recyclebin
    async recyclebin(req, res, next){
        if(req.user){
            const itemPerPage = 10;
            const title = req.query.title;
            const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
            const accounts = await accountService.binList(title, page,itemPerPage);
            const TotalPage = Math.ceil(accounts.count/itemPerPage) > page + 1 ? Math.ceil(accounts.count/itemPerPage) : page + 1
            const pagItems = pagination.paginationFunc(page+1, TotalPage);
            const counter = await accountService.countBin()

            res.render('accounts/binAccount', {
                Items: pagItems,
                accounts: accounts.rows,
                message: req.query.message,
                title: title,
            });
        } else{
            res.redirect('/');
        }
    }

    //[PATCH]:accounts/:id/restore
    async restore(req, res, next){
        
        try {
            await accountService.Restore(req.params.id)
            res.redirect('/accounts')
        } catch (error) {
            next(error)
        }
    }

    //[DELETE]:accounts/:id/destroy
    async destroy(req, res, next){
        try {
            await accountService.destroyDelete(req.params.id)
            res.redirect('back')
        } catch (error) {
            next(error)
        }
    }
    //[GET]:accounts/:id/edit
    async edit(req, res, next){
        if(req.user){
            try {
                var admin = await accountService.getInfor(req.params.id)
                res.render('accounts/inforAccount',{admin})
            } catch (error) {
                next(error)
            }
        } else{
            res.redirect('/');
        }
    }
    //[PUT]:accounts/:id/edit
    async update(req, res, next){
        try {
            await accountService.saveUpdate(req);
            res.redirect('back');
        } catch (error) {
            next(error)
        }
    }
    //[POST]:accounts/:id/delete
    async reset(req, res, next){
        try {
            await accountService.resetPass(req.params.id);
            res.redirect('back');
        } catch (error) {
            next(error)
        }
    }

}



module.exports = new AccountController