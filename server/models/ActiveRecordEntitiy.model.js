const getDb = require('../db.js');
const db = getDb.getDb();


class ActiveRecordEntitiy {

    static async query (table,column,value,count="one") {
        const res = await db.query('SELECT * FROM ? WHERE ?=?',[table,column,value]);
        switch (count) {
            case 'one':
                return res[0]
            case 'all':
                return res;
        }
    }

    static async queryAll (table) {
        const res = await db.query('SELECT * FROM ?',[table]);
        return res;
    }
    
}


module.exports = ActiveRecordEntitiy;