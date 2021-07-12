const mysql = require('mysql2');
let db;

const config = { 
    host:'us-cdbr-east-04.cleardb.com',
    user:'be759472b98dfa',
    password:'f143f15b',
    database:'heroku_8bafe6a62d223f1',
    
}


class Database {
    constructor(config) {
        try {
            this.connection = mysql.createConnection(config);
        } catch (error) {
            console.log(error.message);
        }
        
    }

    query(sql,args) {
        return new Promise((resolve,reject)=>{
            this.connection.execute(sql,args,(err,data)=>{
                
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