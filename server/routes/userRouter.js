const {Router} = require('express');
const router = Router();
const User = require('../models/user.model.js');
const Favourite = require('../models/favourite.model.js');
const { USERS } = require('../constants/tables.js');
const { ID } = require('../constants/columns.js');
const { spliter } = require('../functions/functions.js');
const createToken = require('../auth/auth.js');
const config = require('../auth/config.js');

router.get('/', async (req,res)=>{
    const userId=req.session?.user?.id;


    
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

router.post('/',async(req,res)=> {
    const {userid} = req.body;
    try {
        const getUser = await User.query(USERS,ID,userId)
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
      res.json('user not found')  
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

                
                return res.status(200).json(newUser.id)
            }else {
                throw new Error('cannot create user');
            }
        }else {
            throw new Error('Every field must be filled')
        }
    }
    catch(e) {
        res.json({message:e.message});
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
            return res.status(200).json({auth:true,token});
            
        }
        throw new Error('wrong password or email');
    }
    catch (e) {
        
        res.status(404).json(e.message);
    }
})

router.get('/logout',async (req,res)=>{
    req.session.destroy((err)=>{
        if (err) return res.status(401)
        res.clearCookie(res.app.get('cookieName'));
        return res.status(200).send({message:"logout succesful"});
    })
})

module.exports = router;