const {Router} = require('express');
const router = Router();
const getDb = require('../db.js');
const db = getDb.getDb();

router.get('/', (req,res)=>{
})

router.get('/films', async (req,res)=>{

    let films = await db.query('SELECT * FROM films');
    films.forEach(el => {
        el.filmLink =  el.title.split(' ').join('_');
    });
    res.json(films);
})


router.get('/addfilm', (req,res)=>{

})

router.get('/editfilm/:id',async (req,res)=>{
    const id = req.params.id;
    try {
        const getFilm= await db.query('SELECT * FROM films WHERE id=?',[id]);
        const film = getFilm[0];
        res.json(film)
        
        
    } catch (e) {
        res.json(e.message);
    }

})

router.post('/editfilm/:id',async (req,res)=>{
    const id = req.params.id;
    const {title,description} =req.body;
    try {
        const getFilm= await db.query('SELECT * FROM films WHERE id=?',[id]);
        const film = getFilm[0];
        if (title){
            await db.query('UPDATE films set title=?, description=? where id=?',[title,description,id]);
            return  res.status(200);
        }
        throw new Error();
        
        
    } catch (e) {
        res.json(e.message);
    }

})

router.post('/addfilm', async(req,res)=>{
    if(req.session?.user?.role !=='admin') return res.redirect('/');
    const {title,description} = req.body;
    try {
        if (title) {
            const result = await db.query('INSERT INTO films (title,description) VALUES (?,?)',[title,description]);
            const getFilm= await db.query('SELECT * FROM films WHERE id=?',[result.insertId]);
            const newFilm = getFilm[0];
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