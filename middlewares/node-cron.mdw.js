const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const productModal = require('../models/product.model');


module.exports = function(app){
    new cron.schedule('*/5 * * * * *', async() => {
        const  rows = await productModal.all();
        for(i=0;i<rows.length;i++){
            if(rows[i].AuctionEnd < Date.now()&& rows[i].Status != 'Yes'){
                console.log('update' + rows[i].ItemID);
                let result = await productModal.updateStatusDB(rows[i].ItemID);
                let result2 = await productModal.updateStatusBidDB(rows[i].ItemID);
            }
        }
      })
}