const db = require('../utils/db');

module.exports = {
    allSeller: () => db.load('select * from user where Type = 1'),
    countSeller: () => db.load('select count(*) as numSeller from user where Type = 1'),
    
    allBidder: () =>db.load('select * from user where Type = 0'),
    countBidder: ()=> db.load('select count(*) as numBidder from user where Type = 0'),
    
    requestSeller: () =>db.load('select * from user where Type = 0 and request = 1'),
    countRequest: () => db.load('select count(*) as numRequest from user where Type = 0 and request = 1'),
    

    deleteSeller: (id) => {
        const sql = `update user set Type = 0 where UserID = ${id}`
        return db.load(sql);
    },
    modifySeller: (entity) => {
        const condition = {UserID: entity.UserID};
        delete entity.UserID;
        return db.modify('user',entity,condition);
    },
    sellerDetail: (id) =>{
        const sql = `select * from user where UserID = ${id} and Type = 1`
        return db.load(sql);
    },
    aproveBidder: (id) => {
        const sql = `update user set Type = 1, request = 0 where UserID = ${id}`
        return db.load(sql);
    },
    rejectBidder: (id) => {
        const sql = `update user set request = 0 where UserID = ${id}`
        return db.load(sql);
    },
    singleByAdmin: async Username => {
        const rows = await db.load(`select * from administrator where Username = '${Username}'`);
        if(rows.length === 0) 
            return null;
        return rows[0];
    },
    addAdmin: entity => db.add('administrator',entity),
}