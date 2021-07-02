const {Router} = require('express');
const { ID } = require('../constants/columns.js');
const { FILMS } = require('../constants/tables.js');
const router = Router();
const getDb = require('../db.js');
const { spliter } = require('../functions/functions.js');
const Film = require('../models/film.model.js');
const db = getDb.getDb();

router.get('/', (req,res)=>{
})

router.get('/films', async (req,res)=>{

    try {
        const films = await Film.queryAll(FILMS)
        films.forEach(el => {
            el.filmLink =  spliter(el.title);
        });
        res.json(films);      
    } catch (e) {
        res.json(e.message).status(404)
    }

})


router.get('/addfilm', (req,res)=>{

})

router.get('/editfilm/:id',async (req,res)=>{
    const id = req.params.id;
    try {
        const film= await Film.query(FILMS,ID,id);
        
        res.json(film)
        
        
    } catch (e) {
        res.json(e.message).status(404);
    }

})

router.post('/editfilm/:id',async (req,res)=>{
    const id = req.params.id;
    const {title,description} =req.body;
    try {
        const film= await Film.query(FILMS,ID,id);
        
        if (film.id){
            await Film.updateFilm(title,description,id)
            return res.status(200);
        }
        throw new Error();
        
        
    } catch (e) {
        res.json(e.message).status(500);
    }

})

router.post('/addfilm', async(req,res)=>{
    const {title,description} = req.body;
    try {
        if (title) {
            const result = await Film.addFilm(title,description);
            return res.status(200);
        }

    } catch (e) {
        res.json(e.message);
    }
    res.status(200);
})

router.get('/deletefilm/:id',async(req,res)=>{
    if(req.session?.user?.role !=='admin') return res.redirect('/');
    const id = req.params.id;
    try {
        if (id) {
            await db.query('DELETE FROM films WHERE id=?',[id]);
            await db.query('DELETE FROM favourites WHERE film_id=?',[id]);
            await db.query('DELETE FROM ratings WHERE film_id=?',[id]);
            res.status(200)
        }
        
    } catch (e) {
        res.status(200);
    }
})

router.get('/users', (req,res)=>{
})


module.exports = router;