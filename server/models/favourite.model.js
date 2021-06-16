const getDb = require('../db.js');
const db = getDb.getDb();

class Favourite {
    static async addFavourite(userId,filmId) {
       
        await db.query('INSERT INTO favourites (user_id,film_id) values (?,?)',[userId,filmId]);
    }

    static async getAllFavourites(userId) {
        const favFilms = await db.query('select films.id, films.title, films.description from favourites left join films on favourites.film_id = films.id where favourites.user_id = ?',[userId]);
        return favFilms;
    }
}
 

module.exports = Favourite;