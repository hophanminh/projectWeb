const db = require('../utils/db');

module.exports={
    register: (entity) => db.add('user',entity),
    singleByUsername: async Username => {
        const rows = await db.load(`select * from user where Username = '${Username}'`);
        if(rows.length === 0) 
            return null;
        return rows[0];
    },
}