const getDb = require('../db.js');
const db = getDb.getDb();


class ActiveRecordEntitiy {

    static async query (table,column,value,count="one") {
        
        try {
            
            
            const data = await db.query(`select * from ${table} where ${column} = ?`,[value]);
            
            switch (count) {
                case 'one':
                    return data[0]
                case 'all':
                    return data;
            }    
        } catch (e) {
            return e.message
        }

    }

    static async queryAll (table) {
        const data = await db.query(`SELECT * FROM ${table}`);
        return data;
    }

    static async delete (table,column,value) {
        const data = await db.query(`delete from ${table} where ${column} = ?`,[value])
    }
    
}


module.exports = ActiveRecordEntitiy;