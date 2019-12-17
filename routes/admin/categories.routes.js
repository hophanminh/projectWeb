const express = require('express');
const time = require('moment');
// const adminModel = require('../../models/admin.model');
const categoryModal = require('../../models/categories.model');

const router = express.Router();

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;
