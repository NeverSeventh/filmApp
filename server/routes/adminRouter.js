const {Router} = require('express');
const { ID, TITLE, FILM_ID } = require('../constants/columns.js');
const { FILMS, COMMENTS, FAVOURITES, RATINGS } = require('../constants/tables.js');
const router = Router();
const getDb = require('../db.js');
const NotAdminError = require('../errors/notAdmin.js');
const { spliter } = require('../functions/functions.js');
const adminVerify = require('../middlewares/adminVerify.js');
const authenticateToken = require('../middlewares/tokenVerify.js');
const Comment = require('../models/comment.model.js');
const Favourite = require('../models/favourite.model.js');
const Film = require('../models/film.model.js');
const Rating = require('../models/rating.model.js');
const db = getDb.getDb();



router.get('/films',adminVerify, async (req,res)=>{

    try {
        if (!req.admin) throw NotAdminError('Not Admin')
        const films = await Film.queryAll(FILMS)
        films.forEach(el => {
            el.filmLink =  spliter(el.title);
        });
        res.json(films);      
    } catch (e) {
        res.json(e.message).status(404)
    }

})






router.post('/editfilm',adminVerify,async (req,res)=>{
    
    const {id,title,description} =req.body;
    try {
        if (!req.admin) NotAdminError('Not Admin');
        const film= await Film.query(FILMS,ID,id);
        
        if (film.id){
            await Film.updateFilm(title,description,id)
            return res.status(200).json('Update succesful');
        }
        throw new Error();
        
        
    } catch (e) {
        
        res.json(e.message).status(500);
    }

})

router.post('/addfilm',adminVerify, async(req,res)=>{
    const {title,description} = req.body;
    try {
        if (!req.admin) throw new NotAdminError('Not Admin')
        if (title) {
            const result = await Film.addFilm(title,description);
            return res.status(200).json('Film added succesfuly');
        }
        throw new Error('film is not added')
    } catch (e) {
        res.json(e.message);
    }
    
})

router.post('/deletefilm',adminVerify,async(req,res)=>{

   const {id} = req.body;
    try {
        if (!req.admin) throw new NotAdminError('Not Admin')
        if (id) {
            await Film.delete(FILMS,ID,id);
            await Comment.delete(COMMENTS,FILM_ID,id);
            await Favourite.delete(FAVOURITES,FILM_ID,id);
            await Rating.delete(RATINGS,FILM_ID,id);
            res.status(200).json('Delete Succesful')
        }
        
    } catch (e) {
        console.log(e.message);
        res.json(e.message);
    }
})

router.get('/users', (req,res)=>{
})


module.exports = router;