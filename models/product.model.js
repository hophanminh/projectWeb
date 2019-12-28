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
    add: (entity) => db.add('item',entity),
    single: (id) => {
        const sql = `
        SELECT *, u1.Fname SellerName, u2.Fname BidderName
        FROM item i join user u1 join user u2
        on i.SellerID = u1.UserID and i.BidderID = u2.UserID
        where i.ItemID = '${id}'
        `
        return db.load(sql);
    },
    bid: (entity) => {
        const condition = {ItemID: entity.ItemId};
        delete entity.ItemID;
        return db.modify('item',entity,condition);
    },
    timeBid: (entity) => {
        entity.BidAmount = entity.CurrentBidAmount;
        delete entity.CurrentBidAmount;
        console.log(entity);
        return db.add('bids',entity);
    },
    countBid: async(id)=>{
        const sql = `select count(*) as total from bids where ItemID =  ${id}`;
        const times = await db.load(sql);
        return times[0].total;
    },
    bidHistory: id => {
        const sql = 
        `select b.*, u.Fname as BidderName from bids b join user u on u.UserID = b.BidderID 
        where ItemID = ${id}
        order by BidTime desc 
        limit ${config.listHistory.people}`
        const result = db.load(sql);
        return result;
    },
}


