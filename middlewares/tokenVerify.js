const jwt = require('jsonwebtoken');    

const authenticateToken = (req,res,next)=> {    
    try {
       
    const authHeader = req.headers['authorization'];
    
   
    if (!authHeader) {return next()}
    
    jwt.verify(authHeader,'secret',(err,user)=> {
        
        if (err)  {return next() }
        
        req.auth = true;
        req.userid = user.userid;
        next();
    })   
    
    } catch (e) {
        console.log(e.message);
    }

    
}

module.exports = authenticateToken;