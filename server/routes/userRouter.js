const {Router} = require('express');
const router = Router();
const User = require('../models/user.model.js');
const Favourite = require('../models/favourite.model.js');
const { USERS } = require('../constants/tables.js');
const { ID } = require('../constants/columns.js');
const { spliter } = require('../functions/functions.js');
const createToken = require('../auth/auth.js');
const config = require('../auth/config.js');
const authenticateToken = require('../middlewares/tokenVerify.js');

router.get('/',authenticateToken, async (req,res)=>{
    const userId=req.session?.user?.id;
    console.log(req.auth)

    
    try {
        const user = await User.query(USERS,ID,userId);

        const favFilms = await Favourite.getAllFavourites(userId);
        
        favFilms.forEach(el => {
            if (el.title) {
                el.filmLink = spliter(el.title);
            }
            
        });
        res.json({user, favFilms}).status(200);
    } catch (error) {
        res.json(error.message).status(401);
    }

    
    
})

router.post('/',authenticateToken,async(req,res)=> {
    const {userid} = req.body;
    console.log(req.auth);
    
    try {
        if (!req.auth) throw new Error('Auth check failed')
        const getUser = await User.query(USERS,ID,userid);
        
        const favFilms = await Favourite.getAllFavourites(userid);
       
        
        favFilms.forEach(el => {
            if (el.title) {
                el.filmLink = spliter(el.title);
            }       
        });
        
        if (getUser) {
            const user = {
                id:getUser.id,
                email:getUser.email,
                nickname:getUser.nickname
            }
            
            return res.json({user,favFilms});
        }
        return res.json('user not found')
    } catch (e) {
      res.json(e.message)  
    }


})

router.get('/signup',(req,res)=>{
  
})

router.post('/signup',async(req,res)=>{
    const {nickname,email,password} = req.body;
    try {
        if (nickname&&email&&password) {
            const newUser = await User.addUser(email,nickname,password)
            
            if (newUser) {

            let isAdmin = false;
            if (newUser.role ==='admin')  isAdmin=true;
            const token = createToken({userid:newUser.id,isAdmin},'secret',config)
            return res.status(200).json({userid:newUser.id,token,isAdmin});
            }else {
                throw new Error('cannot create user');
            }
        }else {
            throw new Error('Every field must be filled')
        }
    }
    catch(e) {
        
        res.json(e.message).status(501);
    }
})

router.get('/signin',(req,res)=>{
 
})

router.post('/signin',async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.logIn(email,password);
        if(user?.password === password) {

            let isAdmin = false;
            if (user.role ==='admin')  isAdmin=true;
            const token = createToken({userid:user.id,isAdmin},'secret',config)
            return res.status(200).json({userid:user.id,token,isAdmin});
            
        }
        throw new Error('wrong password or email');
    }
    catch (e) {
        
        res.status(404).json(e.message);
    }
})

router.get('/logout',async (req,res)=>{

})

module.exports = router;