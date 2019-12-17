const db = require('../utils/db');
const config = require('../config/default.json');
module.exports={
    all: ()=>{
        const sql = `
        SELECT *, u1.Fname SellerName, u2.Fname BidderName
        FROM item i join user u1 join user u2
        on i.SellerID = u1.UserID and i.BidderID = u2.UserID
        `
        return db.load(sql);
    },
    countAll: async ()=>{
        const rows = await db.load(`select count(*) as total FROM item i join user u1 join user u2
        on i.SellerID = u1.UserID and i.BidderID = u2.UserID`)
        return rows[0].total
    },
    pageAll: (offset)=>{
        const sql = `
        SELECT *, u1.Fname SellerName, u2.Fname BidderName
        FROM item i join user u1 join user u2
        on i.SellerID = u1.UserID and i.BidderID = u2.UserID
        limit ${config.paginate.limit} offset ${offset}
        `
        return db.load(sql);
    },
    add: (entity) => db.add('item',entity),
    single: (id) => {
        const sql = `
        SELECT *, u1.Fname SellerName, u2.Fname BidderName
        FROM item i join user u1 join user u2
        on i.SellerID = u1.UserID and i.BidderID = u2.UserID
        where i.ItemID = ${id}
        `
        return db.load(sql);
    },
    bid: (entity) => {
        const condition = {ItemID: entity.ItemId};
        delete entity.ItemID;
        return db.modify('item',entity,condition);
    },

}


