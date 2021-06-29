const getDb = require('../db.js');
const db = getDb.getDb();

class Film {
    static async findFilmByTitle (title) {
        const [film] = await db.query('SELECT * FROM films where title=?',[title]);
        
        return film;
    } 

    static async getAllFilms() {
        let filmsList = await db.query('SELECT * FROM films');
        return filmsList;
    }
}

module.exports = Film;