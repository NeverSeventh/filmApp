const {Router} = require('express');
const router = Router();
const Film = require('../models/film.model.js');
const User = require('../models/user.model.js');
const Favourite = require('../models/favourite.model.js');
const Rating = require('../models/rating.model.js');
const Comment = require('../models/comment.model.js');
const { FILMS, USERS } = require('../constants/tables.js');
const { ID, TITLE } = require('../constants/columns.js');
const { spliter } = require('../functions/functions.js');
const authenticateToken = require('../middlewares/tokenVerify.js');
const AuthError = require('../errors/authError.js');


router.get('/all',async (req,res)=>{
    try {
        let filmsList =await Film.queryAll(FILMS);
        filmsList.forEach(el => {
            el.filmLink =  spliter(el.title);
        });
         res.json(filmsList).status(200);
    } catch (error) {
        res.json(error.message).status(404);
    }
     

    
});

router.post('/add',authenticateToken, async(req,res)=>{

    try {
        const userid = req;
        
        const {filmTitle} = req.body;

        
        if(filmTitle && userid) {
            const user = await User.query(USERS,ID,userid);
            const film = await Film.query(FILMS,TITLE,filmTitle );
            if (user && film) {
                await Favourite.addFavourite(user.id,film.id);
                return res.status(200).json({message:'film added'})
            }
        }
       

        throw new Error();
    }
    catch(e) {
        res.json(e.message).status(501);
    }
})

router.get('/:title', async(req,res)=>{
    
    try {
        const title=req.params.title;
        const  normalTitle = spliter(title);
        const film = await Film.query(FILMS,TITLE,normalTitle);

        if (film) {
            const comments = await Comment.findAllCommentsByFilm(film.id);
            
            
            return res.json({film,comments})

        }
        throw new Error('No film found');

    }catch(e) {
        res.json(e.message);
    }
})


router.post('/:title',authenticateToken,async(req,res)=> {
    try {
        const rating = parseInt(req.body.rating);

        const {title,commentText} = req.body
        const normalTitle = spliter(title);
        const film = await Film.query(FILMS,TITLE,normalTitle);
        const {userid} = req;
        if (!userid) throw new AuthError();
        if (rating&&film) {
                        
            const user = await User.query(USERS,ID,userid);   
            const responce = await Rating.ratingControl(user.id,film.id,rating);
            
            return res.status(200).end();
        }

        if (film&&commentText) {

                comment = await Comment.addComment(userid,film.id,commentText);
                return res.json(comment).status(200);
            
    
        }


    } catch (e) {
        if (e instanceof AuthError) {
            return res.json('Auth check failed').status(403)
        }
        res.json(e.message).status(404)
    }
})

// router.post('/:title',authenticateToken,async (req,res)=>{

//     const rating = parseInt(req.body.rating);

//     const {title,commentText} = req.body
//     const normalTitle = spliter(title);
//     const film = await Film.query(FILMS,TITLE,normalTitle);
//     const {userid} = req;
    
//     if (rating&&userid&&film)  {
//         try {

            
//             const user = await User.query(USERS,ID,userid);   
//             const responce = await Rating.ratingControl(user.id,film.id,rating);
            
//             return res.status(200).end();
            
//         } catch (e) {
//             res.json(e.message)
//         }
//     } 
//     if (userid&&film&&commentText) {
//         try {
//             comment = await Comment.addComment(userid,film.id,commentText);
//             return res.json(comment).status(200);
//         } catch (e) {
//             res.status(501).end()
//         }

//     }
    
// })

router.post('/:title/rating', authenticateToken,async(req,res) => {
    try {
    const {title} = req.body;
    const normalTitle = spliter(title);
    const film = await Film.query(FILMS,TITLE,normalTitle);
    const {userid} = req;
        
        if (film,userid) {
        
            const rating = await Rating.findFilmRating(film.id,userid);
            return res.json(rating).status(200)
            
        } 
         res.status(404).end();
    }
    catch (e) {
        res.json(e.message)
    }
    
})

module.exports = router;