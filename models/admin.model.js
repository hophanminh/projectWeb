const db = require('../utils/db');

module.exports = {
    allSeller: () => db.load('select * from user where Type = 1'),
    allBidder: () =>db.load('select * from user where Type = 0'),
    countSeller: () => db.load('select count(*) as numSeller from user where Type = 1'),
    countBidder: ()=>db.load('select count(*) as numBidder from user where Type = 0'),
        
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
}