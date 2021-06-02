const {Router} = require('express');
const router = Router();
const Film = require('../models/film.model.js');
const User = require('../models/user.model.js');
const Favourite = require('../models/favourite.model.js');
const Rating = require('../models/rating.model.js');
const Comment = require('../models/comment.model.js');


router.get('/all',async (req,res)=>{
    try {
        let filmsList =await Film.getAllFilms();
        filmsList.forEach(el => {
            el.filmLink =  el.title.split(' ').join('_');
        });
         res.json(filmsList).status(200);
    } catch (error) {
        res.json(error.message).status(404);
    }
     

    
});

router.post('/add', async(req,res)=>{

    try {
        const userId = req.session?.user?.id;

        const filmName = req.body.film;

        if(filmName && userId) {
            const user = await User.findUserById(userId);
            const film = await Film.findFilmByTitle(filmName);
            if (user && film) {
                await Favourite.addFavourite(user.id,film.id);
                return res.status(200)
            }
        }
       

        throw new Error();
    }
    catch(e) {
        res.json(e.message).status(501);
    }
})

router.get('/:title', async(req,res)=>{
    let title=req.params.title;
    try {
        const  normalTitle = title.split('_').join(' ');
         const film = await Film.findFilmByTitle(normalTitle);

        if (film) {
            const comments = await Comment.findAllCommentsByFilm(film.id);
            const count = await Comment.countComments(film.id);
 
            return res.json({film,comments})

        }
        throw new Error('No film found');

    }catch(e) {
        res.json(e.message);
    }
})

router.post('/:title',async (req,res)=>{
    const rating = parseInt(req.body.rating);
    let title = req.params.title
    const userId = req.session?.user?.id;
    const commentText = req.body.commentText;
    const normalTitle = title.split('_').join(' ');
    const film = await Film.findFilmByTitle(normalTitle);
    if (rating&&userId&&film)  {
        try {

            
            const user = await User.findUserById(userId);   
            await Rating.ratingControl(user.id,film.id,rating)
            
            // const check = await db.query('SELECT * FROM ratings WHERE user_id=? and film_id=?',[user.id,film.id]);

            // if(check.length ===0) {
            //     await db.query('INSERT INTO ratings(user_id,film_id,rating) values(?,?,?)',[userId,film.id,rating])
            // }else {
            //     await db.query('UPDATE ratings SET rating=? WHERE user_id=? and film_id=?',[rating,userId,film.id])
            // }
                
            
        } catch (e) {
            res.json(e.message)
        }
    }
    if (userId&&film&&commentText) {
        comment = await Comment.addComment(userId,film.id,commentText);
        res.json(comment).status(200);
    }
    
})


module.exports = router;