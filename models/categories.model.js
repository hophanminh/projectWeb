const db = require('../utils/db');

module.exports={
    allCategory: () => {
        const sql = `SELECT c.*, count(*) Total FROM category c right join item i  on c.CatID = i.CatID group by c.CatName`
        return db.load(sql);
    },
    add: (entity) => db.add('category',entity),
}