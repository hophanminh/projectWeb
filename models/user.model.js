const db = require('../utils/db');

module.exports={
    register: (entity) => db.add('user',entity),
    singleByUsername: async Username => {
        const rows = await db.load(`select * from user where Username = '${Username}'`);
        if(rows.length === 0) 
            return null;
        return rows[0];
    },
    singleByEmail: async Email => {
        const rows = await db.load(`select * from user where Email = '${Email}'`);
        console.log(rows);
        if(rows.length === 0) {
            return false;
        }
        return rows[0];
    },
    changePass: entity =>{
        const condition = {UserID: entity.UserID};
        delete entity.UserID;
        return db.modify('user',entity,condition);
    },
    countBid: async Username => {
        const rows = await db.load(`SELECT count(*) as total FROM user u join bids b on u.UserID = b.BidderID where u.Username = '${Username}'`);
        if(rows.length === 0)
            return 0;
        return rows[0].total;
    },
    getIDByUsername: async value => {
        const rows=  await db.load(`select * from user where Username = '${value}'`);
        console.log(rows);
        return rows;
    },
    getIDByEmail: value => db.load(`select * from user where Email = '${value}'`),
    modifyProfile: entity =>{
        const condition = {UserID: entity.UserID};
        delete entity.UserID;
        return db.modify('user',entity,condition);
    },
}