const db = require('../utils/db');

module.exports = {
    allSeller: () => db.load('select * from seller'),
    allBidder: () => db.load('select * from bidder'),

    add: (entity) => db.add('administrator',entity),

    deleteSeller: (id) => db.delete('seller',{SellerID: id}),
    modifySeller: (entity) => {
        const condition = {SellerID: entity.SellerID};
        delete entity.SellerID;
        return db.modify('seller',entity,condition);
    },
    sellerDetail: (id) =>{
        const sql = `select * from seller where SellerID = ${id}`
        return db.load(sql);
    },
}