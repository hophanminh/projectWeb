const express = require('express');
const adminModel = require('../../models/admin.model');

const router = express.Router();

router.get('/', async(req,res)=>{
    const rows = await adminModel.all();
    res.render('adminViews/Management',{
        seller: rows,
        empty: rows.length === 0,
        title: 'Management',
        style: 'style.css'
    })
})


// Add admin mai mot lam
// router.get('/addAdmin',(req,res)=>{
//     res.render('adminViews/addCategories',{
//         title: 'Add categories',
//         style: 'style.css'
//     })
// })

// router.post('/addCategories',async (req,res)=>{
//     const entity ={
//         AdminID: 7,
//         Username: req.body.Username,
//         Password: '123'
//     }
//     console.log(entity);

//     const result = await adminModel.add(entity);
//     //console.log(result);
//     res.render('adminViews/addCategories',{
//         title: 'Add categories',
//         style: 'style.css'
//     })
// })

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;