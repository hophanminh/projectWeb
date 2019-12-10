const db = require('../utils/db');

module.exports = {
    allSeller: () => db.load('select * from seller'),
    allBidder: () => db.load('select * from bidder'),

    add: (entity) => db.add('administrator',entity),

    deleteSeller: (id) => db.delete('seller',{SellerID: id}),

    sellerDetail: (id) =>{
        const sql = `select * from seller where SellerID = ${id}`
        return db.load(sql);
    },
}