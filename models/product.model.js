const db = require('../utils/db');
const config = require('../config/default.json');
module.exports={
    all: ()=>{
        const sql = `select i.ItemID, i.Title,i.StartBidAmount,i.TinyDes,s.Fname SellerFname, b.Fname BidderFname, i.AuctionStart
        from item i join seller s join bidder b on i.SellerID=s.SellerID and i.BidderID = b.BidderID`
        return db.load(sql);
    },
    countAll: async ()=>{
        const rows = await db.load(`select count(*) as total from item i join seller s join bidder b on i.SellerID=s.SellerID and i.BidderID = b.BidderID`)
        return rows[0].total
    },
    pageAll: (offset)=>{
        const sql = `select i.ItemID, i.Title,i.StartBidAmount,i.TinyDes,s.Fname SellerFname, b.Fname BidderFname, i.AuctionStart
        from item i join seller s join bidder b on i.SellerID=s.SellerID and i.BidderID = b.BidderID
        limit ${config.paginate.limit} offset ${offset}
        `
        return db.load(sql);
    },
    add: (entity) => db.add('item',entity),
    single: (id) => {
        const sql = `
        select i.*, s.Fname SellerFname, b.Fname BidderFname
        from item i join seller s join bidder b on i.SellerID=s.SellerID and i.BidderID = b.BidderID
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


