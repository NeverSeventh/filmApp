const getDb = require('../db.js');
const db = getDb.getDb();

class Comment {
    static async findCommentById(id) {
        const [comment] = await db.query('SELECT comments.text,comments.id,comments.film_id,users.nickname FROM comments left join users on comments.user_id = users.id WHERE comments.id=?',[id]);
        return comment;

   
    }

    static async addComment(userId,filmId,text) {
        const insert = await db.query('INSERT INTO comments (user_id,film_id,text) values(?,?,?)',[userId,filmId,text]);
        const newComment = Comment.findCommentById(insert.insertId);
        return newComment;
    }

    static async findAllCommentsByFilm(filmId) {
        const comments = await db.query('select comments.id,comments.text,users.nickname from comments  left join users on comments.user_id = users.id where film_id=?',[filmId]);
        return comments;
    }

    static async findAllCommentsByUser(userId) {
        const comments = await db.query('select * from comments  left join users on comments.user_id = users.id where film_id=?',[userId]);
        return comments;
    }

    static async countComments(filmId) {
        const getCount =  await db.query('select COUNT(*) from comments where film_id=?',[filmId]);
        const count = getCount[0]['COUNT(*)'];
        return count;
    }

    static async filterCommentsByFilm(filmId,limit,commentId) {
        const comments = await db.query('select * from comments  left join users on comments.user_id = users.id where film_id=? LIMIT ?',[filmId,limit]);
        return comments;
    }

}


module.exports = Comment;