const jwt = require('jsonwebtoken');    

const adminVerify = (req,res,next)=> {    
    try {
    const authHeader = req.headers['authorization'];
    
   
    if (!authHeader) { return res.sendStatus(403)}
    
    jwt.verify(authHeader,'secret',async(err,user)=> {
        
        if (err)  { return res.sendStatus(403) }
        
        req.userid = user.userid;
        next();
    })   
    
    } catch (e) {
        console.log(e.message);
    }

    
}

module.exports = adminVerify;