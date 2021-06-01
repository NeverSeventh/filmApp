const getDb = require('../db.js');
const db = getDb.getDb();

class Film {
    static async findFilmByTitle (title) {
        const getFilm = await db.query('SELECT * FROM films where title=?',[title]);
        const film = getFilm[0];
        return film;
    } 

    static async getAllFilms() {
        let filmsList = await db.query('SELECT * FROM films');
        return filmsList;
    }
}

module.exports = Film;