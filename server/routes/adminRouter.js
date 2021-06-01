const {Router} = require('express');
const router = Router();
const getDb = require('../db.js');
const db = getDb.getDb();

router.get('/', (req,res)=>{
    res.render('admin');
})

router.get('/films', async (req,res)=>{
    if(req.session?.user?.role !=='admin') return res.redirect('/');

    let films = await db.query('SELECT * FROM films');
    films.forEach(el => {
        el.filmLink =  el.title.split(' ').join('_');
    });
    res.render('adminfilms',{films});
})


router.get('/addfilm', (req,res)=>{
    if(req.session?.user?.role !=='admin') return res.redirect('/');

    res.render('addfilm');
})

router.get('/editfilm/:id',async (req,res)=>{
    const id = req.params.id;
    try {
        const getFilm= await db.query('SELECT * FROM films WHERE id=?',[id]);
        const film = getFilm[0];
        res.render('editfilm',{film})
        
        
    } catch (e) {
        res.redirect('/admin');
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
            return  res.redirect('/admin');
        }
        throw new Error();
        
        
    } catch (e) {
        res.redirect('/');
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
            return res.redirect('/');
        }

    } catch (e) {
        res.render('/admin',{e});
    }
    res.render('addfilm');
})

router.get('/deletefilm/:id',async(req,res)=>{
    if(req.session?.user?.role !=='admin') return res.redirect('/');
    const id = req.params.id;
    try {
        if (id) {
            await db.query('DELETE FROM films WHERE id=?',[id]);
            await db.query('DELETE FROM favourites WHERE film_id=?',[id]);
            await db.query('DELETE FROM ratings WHERE film_id=?',[id]);
            res.redirect('/admin/films')
        }
        
    } catch (e) {
        res.redirect('/admin');
    }
})

router.get('/users', (req,res)=>{
    res.render('admin');
})


module.exports = router;