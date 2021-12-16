module.exports = (req,res,next) => {
    if(req.user){
        res.locals.user = req.user;
        
      if(req.user.LOAINV =='adm'){
        res.locals.user.adm = true
      }
      if(req.user.LOAINV =='emp'){
        res.locals.user.emp = true
      }
      if(req.user.LOAINV =='mag'){
        res.locals.user.mag = true
      }
      }
      next();
}