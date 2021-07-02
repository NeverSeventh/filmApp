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

router.post('/add', async(req,res)=>{

    try {
        const userId = req.body.userid;

        const filmName = req.body.film;

        
        if(filmName && userId) {
            const user = await User.query(USERS,ID,userId);
            const film = await Film.query(FILMS,TITLE,filmName);
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
    const title=req.params.title;
    try {
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

router.post('/:title',async (req,res)=>{
    const rating = parseInt(req.body.rating);
    const title = req.body.title
    const userId = req.body.userid;
    const commentText = req.body.commentText;
    const normalTitle = spliter(title);
    const film = await Film.query(FILMS,TITLE,normalTitle);
    
    if (rating&&userId&&film)  {
        try {

            
            const user = await User.query(USERS,ID,userId);   
            const responce = await Rating.ratingControl(user.id,film.id,rating);
            
            return res.status(200);
            
        } catch (e) {
            res.json(e.message)
        }
    }
    if (userId&&film&&commentText) {
        try {
            comment = await Comment.addComment(userId,film.id,commentText);
            return res.json(comment).status(200);
        } catch (e) {
            res.status(501)
        }

    }
    
})

router.post('/:title/rating', async(req,res) => {
    const {title} = req.body;
    const normalTitle = spliter(title);
    const film = await Film.query(FILMS,TITLE,normalTitle);
    const {userid} = req.body;
    if (film,userid) {
        try {
            const rating = await Rating.findFilmRating(film.id,userid);
            return res.json(rating)
            
        } catch (e) {
            res.json(e.message).status(501)
        }
    }
})

module.exports = router;