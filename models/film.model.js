const getDb = require('../db.js');
const ActiveRecordEntitiy = require('./ActiveRecordEntitiy.model.js');
const db = getDb.getDb();

class Film extends ActiveRecordEntitiy {


    static async updateFilm(title,description,id) {
        const res = await db.query('UPDATE films set title=?, description=? where id=?',[title,description,id]);
    }
    
    static async addFilm(title,description) {
        const res = await db.query('INSERT INTO films (title,description) VALUES (?,?)',[title,description])
        return res;
    }



}

module.exports = Film;