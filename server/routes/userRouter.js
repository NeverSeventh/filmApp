const {Router} = require('express');
const router = Router();
const User = require('../models/user.model.js');
const Favourite = require('../models/favourite.model.js');
router.get('/', async (req,res)=>{
    const userId=req.session?.user?.id;
    
    // const user = await userModel.findById(userId).populate('favouriteFilms');
    
    // user.favouriteFilms.forEach(el => {
    //     el.filmsLink =  el.title.split(' ').join('_');
    //     console.log(el.filmsLink);
        
    // });
    try {
        const user = await User.findUserById(userId);

        const favFilms = await Favourite.getAllFavourites(userId);
        favFilms.forEach(el => {
            if (el.title) {
                el.filmsLink = el.title.split(' ').join('_');
            }
            
        });
        res.render('user',{user, favFilms});
    } catch (error) {
        
    }

    
    
})

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.post('/signup',async(req,res)=>{
    const {nickname,email,password} = req.body;
    try {
        if (nickname&&email&&password) {
            const newUser = await User.addUser(email,nickname,password)
            
            if (newUser) {
                req.session.user= {
                    id:newUser.id,
                    role:newUser.role
                };
                return res.status(200).redirect('/user')
            }else {
                throw new Error('cannot create user');
            }
        }else {
            throw new Error('Every field must be filled')
        }
    }
    catch(e) {
        res.render('signup',{e});
    }
})

router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.post('/signin',async(req,res)=>{
    try{
        const user = await User.logIn(req.body.email,req.body.password);
        if(user?.password === req.body.password) {
            req.session.user = {
                id:user.id,
                role:user.role
            }
            return res.status(200).redirect('/user');
        }
        throw new Error('wrong password or email');
    }
    catch (e) {
        res.render('signin',{e});
    }
})

router.get('/logout',async (req,res)=>{
    req.session.destroy((err)=>{
        if (err) return res.redirect('/')
        res.clearCookie(res.app.get('cookieName'));
        return res.redirect('/');
    })
})

module.exports = router;