const db = require('../utils/db');

module.exports={
    all: () => db.load('select * from item'),
    add: (entity) => db.add('item',entity),
}