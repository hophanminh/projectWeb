const db = require('../utils/db');
const config = require('../config/default.json');

module.exports={
    allCategory: () => {
        const sql = `SELECT c.*, count(ifnull(i.ItemID,NULL)) Total 
        FROM category c left join item i  on c.CatID = i.CatID and i.Status ='No'
        group by c.CatName, c.CatID
        `
        
        return db.load(sql);
    },
    singleCategory: id => db.load(`select * from category where CatID = ${id}`),
    changeCategoryName: entity => {
        const condition = {CatID: entity.CatID};
        delete entity.CatID;
        return db.modify('category',entity, condition);
    },
    add: (entity) => db.add('category',entity),
    deleteCategory: (id) => db.delete('category',id),
    countCategory: ()=>db.load(`select count(*) as numCategory from category`),

    countAllByCat: async (id)=>{
        const rows = await db.load(`select count(*) as Total FROM item i join user u1 join user u2
        on i.SellerID = u1.UserID and i.BidderID = u2.UserID where i.CatID = ${id} and i.Status = 'No'`);
        return rows[0].Total
    },
    pageAllByCat: (id,offset)=>{
        const sql = `
        SELECT *, u1.Fname SellerName, u2.Fname BidderName
        FROM item i join user u1 join user u2
        on i.SellerID = u1.UserID and i.BidderID = u2.UserID
        where i.CatID = ${id} and i.Status = 'No'
        limit ${config.paginate.limit} offset ${offset}
        `
        return db.load(sql);
    },
}