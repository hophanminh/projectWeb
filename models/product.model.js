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
        SELECT *, u1.Fname SellerName, u2.Fname BidderName, u2.Point BidderPoint, u1.Point SellerPoint
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
    countWatchList: async UserID => {
        const sql = `
        SELECT count(*) as total  FROM watchlist w join item i join user u join user seller join user bidder 
        on w.ItemID = i.ItemID and w.UserID = u.UserID and i.SellerID = seller.UserID and i.BidderID = bidder.UserID
        where u.UserID = ${UserID}
        `
        const rows = await db.load(sql);
        return rows[0].total;
    },
    watchList: (UserID,offset) => {
        const sql = `
        SELECT distinct i.ItemID, i.*, seller.Fname as SellerName, bidder.Fname as BidderName  FROM watchlist w join item i join user u join user seller join user bidder 
        on w.ItemID = i.ItemID and w.UserID = u.UserID and i.SellerID = seller.UserID and i.BidderID = bidder.UserID
        where u.UserID = ${UserID} and i.Status = 'No'
        limit ${config.paginate.limit} offset ${offset}
        `
        const rows=db.load(sql);
        return rows;
    },
    addItemWatchList: entity => db.add('watchlist',entity),
    deleteItemWatchList: entity => {
        const sql = `delete from watchlist where UserID = ${entity.UserID} and ItemID = ${entity.ItemID}`
        return db.load(sql);
    },
    countBidding: async UserID => {
        const sql = `
        select count(distinct b.ItemID) as total
        from bids b join user u join user seller join user bidder join item i
        on b.BidderID = u.UserID and b.ItemID = i.ItemID and i.SellerID = seller.UserID and i.BidderID = bidder.UserID
        where WinStatus = 'No' and u.UserID = ${UserID} and i.Status = 'No'
        `
        const rows = await db.load(sql);
        return rows[0].total;
    },
    biddingList: async (UserID,offset) => {
        const sql = 
        `
        select distinct b.ItemID, i.*, seller.Fname as SellerName, bidder.Fname as BidderName
        from bids b join user u join user seller join user bidder join item i
        on b.BidderID = u.UserID and b.ItemID = i.ItemID and i.SellerID = seller.UserID and i.BidderID = bidder.UserID
        where WinStatus = 'No' and u.UserID = ${UserID} and i.Status = 'No'
        limit ${config.paginate.limit} offset ${offset}
        `
        const rows= await db.load(sql);
        return rows;
    },
    countWon: async id =>{
        const sql = `
        select count(distinct b.ItemID) as total
        from bids b join user u join user seller join user bidder join item i
        on b.BidderID = u.UserID and b.ItemID = i.ItemID and i.SellerID = seller.UserID and i.BidderID = bidder.UserID
        where WinStatus = 'Yes' and u.UserID = ${id} and i.Status = 'Yes'
        `
        const rows = await db.load(sql);
        return rows[0].total;
    },
    wonList: async (UserID,offset) => {
        const sql = 
        `
        select distinct b.ItemID, i.*, seller.Fname as SellerName, bidder.Fname as BidderName
        from bids b join user u join user seller join user bidder join item i
        on b.BidderID = u.UserID and b.ItemID = i.ItemID and i.SellerID = seller.UserID and i.BidderID = bidder.UserID
        where WinStatus = 'Yes' and u.UserID = ${UserID} and i.Status = 'Yes'
        limit ${config.paginate.limit} offset ${offset}
        `
        const rows = await db.load(sql);
        return rows;
    },
    deleteItemSellList: entity =>{
        const sql = `delete from item where ItemID = ${entity.ItemID} and SellerID = ${entity.SellerID} `
        return db.load(sql);
    },
    modifyItem: entity=>{
        const condition=  {ItemID: entity.ItemID};
        delete entity.ItemID;
        return db.modify('item',entity,condition)
    },
    countSearchList: async (str) => {
        const sql = `
        SELECT count(*) as total
        FROM item i
        join user seller join user bidder
        on seller.UserID = i.ItemID and bidder.UserID = i.BidderID
        WHERE 
        MATCH(Title, FullDes, TinyDes)
        AGAINST("${str}" IN BOOLEAN MODE)
        `
        const rows = await db.load(sql);
        console.log('Count Search:');
        console.log(rows);
        return rows[0].total;
    },
    searchList: (str,offset) => {
        const sql = `
        SELECT *, seller.Fname as SellerName, bidder.Fname as BidderName
        FROM item i
        join user seller join user bidder
        on seller.UserID = i.ItemID and bidder.UserID = i.BidderID
        WHERE 
        MATCH(Title, FullDes, TinyDes)
        AGAINST("${str}" IN BOOLEAN MODE)
        limit ${config.paginate.limit} offset ${offset}
        `
        return db.load(sql);
    },
    topHighestPrice: ()=>{
        const sql = `
        SELECT distinct i.ItemID, i.*, seller.Fname as SellerName, bidder.Fname as BidderName
        from item i
        join user seller join user bidder
        on seller.UserID = i.SellerID and bidder.UserID = i.BidderID
        where i.Status = 'No'
        order by (i.CurrentBidAmount) desc
        limit ${config.topLimit.topLimit}
        `
        return db.load(sql);
    },
    topExpire: ()=>{
        const sql = `
        SELECT distinct i.ItemID, i.*, seller.Fname as SellerName, bidder.Fname as BidderName
        from item i
        join user seller join user bidder
        on seller.UserID = i.SellerID and bidder.UserID = i.BidderID
        where i.AuctionEnd > NOW()
        order by i.AuctionEnd asc
        limit ${config.topLimit.topLimit}
        `
        return db.load(sql);
    },
    topMostBid: ()=>{
        const sql = `
        SELECT distinct i.ItemID, i.*, seller.Fname as SellerName, bidder.Fname as BidderName, count(b.ItemID) as SoLuotBid
        from item i
        join user seller join user bidder
        on seller.UserID = i.SellerID and bidder.UserID = i.BidderID
        join bids b on b.ItemID = i.ItemID
        where i.Status = 'No'
        group by i.ItemID, i.Title
        order by SoLuotBid desc
        limit ${config.topLimit.topLimit}
        `
        return db.load(sql);
    },
    updateStatusDB: (id)=>{
        const sql=`update item set Status = 'Yes' where ItemID = ${id}`;
        return db.load(sql);
    },
    updateStatusBidDB: (id)=>{
        const sql=`update bids set WinStatus = 'Yes' where ItemID = ${id}`;
        return db.load(sql);
    },
    
    

}


