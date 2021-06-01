const mysql = require('mysql2');
let db;

const config = {
    connectionLimit:5,
    host:'localhost',
    user:'root',
    database:'filmdb',
    password:'root'
}


class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(sql,args) {
        return new Promise((resolve,reject)=>{
            this.connection.query(sql,args,(err,data)=>{
                if (err) return reject(err)
                resolve(data);
            });
        });
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}


module.exports= {
    getDb:()=>{
        if (db) return db
        db = new Database(config);
        return db;
    }
}