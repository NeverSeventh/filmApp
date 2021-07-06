const { ID } = require('../constants/columns.js');
const { USERS } = require('../constants/tables.js');
const getDb = require('../db.js');
const ActiveRecordEntitiy = require('./ActiveRecordEntitiy.model.js');
const db = getDb.getDb();
class User extends ActiveRecordEntitiy {



    static async addUser(email,nickname,password) {
        const insert = await db.query('INSERT INTO users (email,password,nickname) values(?,?,?)',[email,password,nickname]);
        const newUser = User.query(USERS,ID, insert.insertId);
        return newUser;
    }

    static async logIn(email,password) {
        const [user] = await db.query('SELECT * FROM users WHERE email=? and password=?',[email,password]);
        
        return user;
    }
}


module.exports = User;