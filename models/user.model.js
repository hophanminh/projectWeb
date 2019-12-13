const db = require('../utils/db');

module.exports={
    register: (entity) => db.add('bidder',entity),
}