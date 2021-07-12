const getDb = require('../db.js');
const ActiveRecordEntitiy = require('./ActiveRecordEntitiy.model.js');
const db = getDb.getDb();

class Rating extends ActiveRecordEntitiy {
    static async ratingControl(userId,filmId,rating) {
        try {
            const check = await db.query('SELECT * FROM ratings WHERE user_id=? and film_id=?',[userId,filmId]);
            if(check.length ===0) {
                const res = await db.query('INSERT INTO ratings(user_id,film_id,rating) values(?,?,?)',[userId,filmId,rating]);
                return res;  
            }else {
                const res = await db.query('UPDATE ratings SET rating=? WHERE user_id=? and film_id=?',[rating,userId,filmId]);
                return res;  
            }
            
         
        } catch (e) {
            return e.message
        }

    }


    static async findAllRatingsByColumn(column,id) {
        try {
            const ratings = await db.query('select * from ratings join films on film_id = films.id where ?=?',[column,id])
            return ratings;
        } catch (e) {
            return e.message
        }

    }


    
    static async findFilmRating(filmid,userid) {
        try {
            const [rating] = await db.query('select rating from ratings left join films on film_id = films.id left join users on user_id = users.id where film_id=? and user_id = ?',[filmid,userid])
            if (rating) {
                return rating.rating;
            }else {
                return 0;
            }
        } catch (e) {
            return (e.message)
        }

    }
 
}

module.exports = Rating;