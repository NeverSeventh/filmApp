const getDb = require('../db.js');
const ActiveRecordEntitiy = require('./ActiveRecordEntitiy.model.js');
const db = getDb.getDb();

class Favourite extends ActiveRecordEntitiy{
    static async addFavourite(userId,filmId) {
       
        await db.query('INSERT INTO favourites (user_id,film_id) values (?,?)',[userId,filmId]);
    }

    static async getAllFavourites(userId) {
        const favFilms = await db.query('select films.id, films.title, films.description,ratings.rating from favourites join films on favourites.film_id = films.id left join ratings on favourites.film_id = ratings.film_id and favourites.user_id = ratings.user_id where favourites.user_id = ?',[userId]);
       
        return favFilms;
    }
}
 

module.exports = Favourite;