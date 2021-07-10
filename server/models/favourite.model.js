const getDb = require('../db.js');
const ActiveRecordEntitiy = require('./ActiveRecordEntitiy.model.js');
const db = getDb.getDb();

class Favourite extends ActiveRecordEntitiy{


    static async favouriteControl (userid,filmid) {
        const check = await db.query('SELECT * FROM favourites WHERE user_id=? and film_id=?',[userid,filmid]);
        if(check.length ===0) {
            const res = await db.query('INSERT INTO favourites(user_id,film_id) values(?,?)',[userid,filmid]);
            return res;
        }else {
            const res = await db.query('DELETE FROM favourites where user_id=? and film_id=?',[userid,filmid]);
            return res;
        }
        
        
    }

    static async checkFavourite (userid,filmid) {
        const check = await db.query('SELECT * FROM favourites WHERE user_id=? and film_id=?',[userid,filmid]) 
        if(check.length ===0) {
            return false
        }else {

            return true;
        }
    }

    static async getAllFavourites(userId) {
        const favFilms = await db.query('select films.id, films.title, films.description,rating from favourites join films on favourites.film_id = films.id left join ratings on favourites.film_id = ratings.film_id and favourites.user_id = ratings.user_id where favourites.user_id = ?',[userId]);
       
        return favFilms;
    }
}
 

module.exports = Favourite;