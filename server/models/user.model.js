const getDb = require('../db.js');
const db = getDb.getDb();
class User {


    static async findUserById(id) {
        
            const getUser = await db.query('SELECT * FROM users WHERE id=?',[id]);
            if(getUser.length ===1) {
                const user = getUser[0];
                return user;
            }
            return undefined;
       
        
    }

    static async addUser(email,nickname,password) {
        const insert = await db.query('INSERT INTO users (email,password,nickname) values(?,?,?)',[email,password,nickname]);
        const newUser = User.findUserById(insert.insertId);
        return newUser;
    }

    static async logIn(email,password) {
        const getUser = await db.query('SELECT * FROM users WHERE email=? and password=?',[email,password]);
        const user = getUser[0];
        return user;
    }
}


module.exports = User;