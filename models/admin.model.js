const db = require('../utils/db');

module.exports={
    all: () => db.load('select * from seller'),
    add: (entity) => db.add('administrator',entity),
}