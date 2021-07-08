const {Router} = require('express');
const { ID, TITLE, FILM_ID } = require('../constants/columns.js');
const { FILMS, COMMENTS, FAVOURITES, RATINGS } = require('../constants/tables.js');
const router = Router();
const NotAdminError = require('../errors/notAdmin.js');
const adminVerify = require('../middlewares/adminVerify.js');
const Comment = require('../models/comment.model.js');
const Favourite = require('../models/favourite.model.js');
const Film = require('../models/film.model.js');
const Rating = require('../models/rating.model.js');




router.get('/films',adminVerify, async (req,res)=>{

    try {
        
        const films = await Film.queryAll(FILMS)
        res.json(films);      
    } catch (e) {
        res.json(e.message).status(404)
    }

})






router.put('/editfilm',adminVerify,async (req,res)=>{
     
    try {
        
        
        const {id,title,description} = req.body;
        const film= await Film.query(FILMS,ID,id);
        
        if (film.id){
            await Film.updateFilm(title,description,id)
            return res.status(200).end();
        }
        throw new Error();
        
        
    } catch (e) {
        
        res.json(e.message).status(500);
    }

})

router.post('/addfilm',adminVerify, async(req,res)=>{
    
    try {
        
        const {title,description} = req.body;
        if (title) {
            const result = await Film.addFilm(title,description);
            return res.status(200).json('Film added succesfuly');
        }
        throw new Error('film is not added')
    } catch (e) {
        res.json(e.message);
    }
    
})

router.delete('/deletefilm',adminVerify,async(req,res)=>{

   
    try {
        
        const {id} = req.body;
        if (id) {
            await Film.delete(FILMS,ID,id);
            await Comment.delete(COMMENTS,FILM_ID,id);
            await Favourite.delete(FAVOURITES,FILM_ID,id);
            await Rating.delete(RATINGS,FILM_ID,id);
            res.status(200).end();
        }
        
    } catch (e) {
        
        res.json(e.message);
    }
})




module.exports = router;