const accountService = require('../services/accountService');
const pagination = require('../../public/js/pages/pagination');

class AccountController{
    //[GET]:accounts/
     async list(req, res, next){
        if(req.user){
            const itemPerPage = 10;
            const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
            const accounts = await accountService.list(page,itemPerPage);
            const TotalPage = Math.ceil(accounts.count/itemPerPage) > page + 1 ? Math.ceil(accounts.count/itemPerPage) : page + 1
            const pagItems = pagination.paginationFunc(page+1, TotalPage);

            if(!accounts){
                res.render('editAccount',{message: 'Something went wrong !!! Try again!'});
            }

            for(let items of accounts.rows){
                if(items.STATUS == 'Block'){
                    items.COLORSTATUS = 'danger'
                }
                else{
                    items.COLORSTATUS = 'success'
                }
            };
            res.render('editAccount', {
                Items: pagItems,
                accounts: accounts.rows
            });
        } else{
            res.redirect('/');
        }
    }


    //[POST]:accounts/add
     async add(req, res){
        const {email, password} = req.body;
        try {
            const account = await accountService.add(email, password);
            if(account){
                return res.render('editAccount',{message: 'Success'});
            }
            else {
                return res.render('editAccount',{message: 'Account is existed !!! Try again!'});
            }
        }
        catch(err){
            return res.render('editAccount',{message: 'Something went wrong !!! Try again!'});
        }
    }
    
}



module.exports = new AccountController