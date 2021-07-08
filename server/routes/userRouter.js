const {Router} = require('express');
const router = Router();
const User = require('../models/user.model.js');
const Favourite = require('../models/favourite.model.js');
const { USERS } = require('../constants/tables.js');
const { ID, EMAIL } = require('../constants/columns.js');
const createToken = require('../auth/auth.js');
const config = require('../auth/config.js');
const authenticateToken = require('../middlewares/tokenVerify.js');
const UserError = require('../errors/userError.js');
const UserLoginError = require('../errors/userError.js');
const AuthError = require('../errors/authError.js');
const bcrypt = require('bcrypt');
const saltRounds = 1;


router.get('/',authenticateToken,async(req,res)=> {
       
    try {    
        if (!req.auth) throw new AuthError('Auth check failed')
        const {userid} = req;
        const getUser = await User.query(USERS,ID,userid);
        
        const favFilms = await Favourite.getAllFavourites(userid);
       
        
        if (getUser) {
            const user = {
                id:getUser.id,
                email:getUser.email,
                nickname:getUser.nickname
            }
            
            return res.json({user,favFilms}).status(200);
        }
        throw new UserError('user not found')
    } catch (e) {
        if (e instanceof AuthError) {
            return res.json('Please login').status(401);
        }
      res.json(e.message)  
    }


})



router.post('/signup',async(req,res)=>{
    
    try {
        const {nickname,email,password} = req.body;
        if (nickname&&email&&password) {
            const hashedPassword = await bcrypt.hash(password,saltRounds);
            
            const newUser = await User.addUser(email,nickname,hashedPassword)
            
            if (newUser) {

            let isAdmin = false;
            if (newUser.role ==='admin')  isAdmin=true;
            const token = createToken({userid:newUser.id,isAdmin},'secret',config)
            return res.status(200).json({userid:newUser.id,token,isAdmin});
            }else {
                throw new UserLoginError('cannot create user');
            }
        }else {
            throw new UserLoginError('Every field must be filled')
        }
    }
    catch(e) {
        console.log(e.message);
        res.json(e.message).status(501);
    }
})


router.post('/signin',async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.query(USERS,EMAIL,email);
        const compare = await bcrypt.compare(password,user.password)
        if(compare) {

            let isAdmin = false;
            if (user.role ==='admin')  isAdmin=true;
            const token = createToken({userid:user.id,isAdmin},'secret',config)
            return res.status(200).json({userid:user.id,token,isAdmin});
            
        }
        throw new UserLoginError('Wrong login or password')
    }
    catch (e) {
        
        res.status(404).json(e.message);
    }
})



module.exports = router;