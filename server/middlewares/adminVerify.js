const jwt = require('jsonwebtoken');    

const adminVerify = (req,res,next)=> {    
    try {
    const authHeader = req.headers['authorization'];
    
   
    if (!authHeader) { req.admin=false; return next()}
    
    jwt.verify(authHeader,'secret',async(err,user)=> {
        
        if (err)  {req.admin=false;return next() }
        
        req.admin = user.isAdmin;
        next();
    })   
    
    } catch (e) {
        console.log(e.message);
    }

    
}

module.exports = adminVerify;