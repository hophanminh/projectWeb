const db = require('../utils/db');

module.exports={
    allCategory: () => {
        const sql = `SELECT c.*, count(ifnull(i.ItemID,NULL)) Total 
        FROM category c left join item i  on c.CatID = i.CatID 
        group by c.CatName, c.CatID`
        return db.load(sql);
    },
    add: (entity) => db.add('category',entity),
    deleteCategory: (id) => db.delete('category',id),
}