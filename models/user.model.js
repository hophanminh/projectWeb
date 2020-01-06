const db = require('../utils/db');
const config = require('../config/default.json');

module.exports={
    register: (entity) => db.add('user',entity),
    singleByUsername: async Username => {
        const rows = await db.load(`select * from user where Username = '${Username}'`);
        if(rows.length === 0) 
            return null;
        return rows[0];
    },
    singleByID: async ID => {
        const rows = await db.load(`select * from user where UserID = '${ID}'`);
        if(rows.length === 0) 
            return null;
        return rows;
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
    countBidID: async id => {
        const rows = await db.load(`SELECT count(*) as total FROM user u join bids b on u.UserID = b.BidderID where u.UserID = '${id}'`);
        if(rows.length === 0)
            return 0;
        return rows[0].total;
    },
    getIDByUsername: async value => {
        const rows=  await db.load(`select * from user where Username = '${value}'`);
        console.log(rows);
        return rows;
    },
    validGetIDByUsername: async (value,id) => {
        const rows=  await db.load(`select * from user where Username = '${value}' and UserID=${id}`);
        console.log(rows);
        return rows;
    },
    getIDByEmail: value => db.load(`select * from user where Email = '${value}'`),
    validGetIDByEmail: (value,id) => db.load(`select * from user where Email = '${value}' and UserID = ${id}`),
    getIDByPhone: value => db.load(`select * from user where PhoneNo = '${value}'`),
    validGetIDByPhone: (value,id) => db.load(`select * from user where PhoneNo = '${value}' and UserID = ${id}`),
    modifyProfile: entity =>{
        const condition = {UserID: entity.UserID};
        delete entity.UserID;
        return db.modify('user',entity,condition);
    },
    countSellList: async id => {
        const sql = `
        SELECT count(*) as total 
        from item i join user seller on i.SellerID = seller.UserID
        left join user bidder on i.BidderID = bidder.UserID
        where i.SellerID = ${id} and Status='No'
        `
        const rows = await db.load(sql);
        return rows[0].total;
    },
    countSoldList: async id => {
        const sql = `
        SELECT count(*) as total
        from item i join user seller join user bidder
        on i.SellerID = seller.UserID and i.BidderID = bidder.UserID
        where i.SellerID = ${id} and Status = 'Yes'`
        const rows = await db.load(sql);
        return rows[0].total;
    },
    sellList: (id, offset) => {
        const sql = `
        SELECT i.*, seller.Fname SellerName, bidder.Fname as BidderName 
        from item i join user seller on i.SellerID = seller.UserID
        left join user bidder on i.BidderID = bidder.UserID
        where i.SellerID = ${id} and Status='No'
        limit ${config.paginate.limit} offset ${offset}
        `
        return db.load(sql);
    },
    soldList: (id, offset) => {
        const sql = `
        SELECT i.*, seller.Fname SellerName, bidder.Fname as BidderName 
        from item i join user seller join user bidder
        on i.SellerID = seller.UserID and i.BidderID = bidder.UserID
        where i.SellerID = ${id} and Status='Yes'
        limit ${config.paginate.limit} offset ${offset}
        `
        return db.load(sql);
    },
    guessProfile: id => {
        const sql = `select UserID, Username, Point, Street, District, City, PhoneNo from user where UserID = ${id}`;
        return db.load(sql);
    },
    addFeedBack: entity => db.add('feedback',entity),
    getFeedback: id =>{
        const sql=`
        SELECT fb.*, uF.Fname as FBerName
        FROM feedback fb
        join user uF on uF.UserID = fb.User1ID
        where User2ID = ${id}
        `
        return db.load(sql);
    },
    sellerRequired: id =>{
        const sql=`update user set request = 1 where UserID = ${id}`;
        return db.load(sql);
    }, 
    countProductSell: async(id) =>{
        const sql = `
        SELECT count(*) as total 
        from item i join user seller on i.SellerID = seller.UserID
        left join user bidder on i.BidderID = bidder.UserID
        where i.SellerID = ${id}
        `
        const rows = await db.load(sql);
        return rows[0].total;
    },
}