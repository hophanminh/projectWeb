const db = require('../utils/db');

module.exports={
    all: ()=>{
        const sql = `select i.Title,i.StartBidAmount,i.TinyDes,s.Fname SellerFname, b.Fname BidderFname, i.AuctionStart
        from item i join seller s join bidder b on i.SellerID=s.SellerID and i.BidderID = b.BidderID`
        return db.load(sql);
    },
    add: (entity) => db.add('item',entity),
    single: (id) => {
        const sql = `
        select i.Title,i.StartBidAmount,i.TinyDes, i.FullDes, s.Fname SellerFname, b.Fname BidderFname, i.AuctionStart
        from item i join seller s join bidder b on i.SellerID=s.SellerID and i.BidderID = b.BidderID
        `
        return db.load(`sql`);
    },
}


