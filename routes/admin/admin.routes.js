const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('bidderManagement',{
        title: 'Bidder Management',
        style: 'style.css'
    })
})


module.exports = router;