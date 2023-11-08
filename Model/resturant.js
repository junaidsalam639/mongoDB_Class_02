const express = require('express');
const resturantModel = require('../Schema/resturant');
const sendResponse = require('../helpers/sendResponse');
const route = express.Router();

route.post('/' , async (req , res) => {
    try{
        const resturant = await resturantModel.create({...req.body});
        sendResponse(res , 200 , resturant , 'Resturant_Add' , false);
    }catch(err){
        sendResponse(res , 403 , null , 'Resturant_Not_Add' , true);
    }
});

route.get('/' , async (req , res) => {
    try{
        const resturant = await resturantModel.find({price : {$gte : 200 , $lte : 300}});
        sendResponse(res , 200 , resturant , 'Resturant_Add' , false);
    }catch(err){
        sendResponse(res , 403 , null , 'Resturant_Not_Add' , true);
    }
});

route.get('/:title/Burger' , async (req , res) => {
    try{
        const resturant = await resturantModel.find({title : 'Burger'});
        sendResponse(res , 200 , resturant , 'Burger' , false);
    }catch(err){
        sendResponse(res , 403 , null , 'Resturant_Not_Add' , true);
    }
});

route.get('/:title/Chicken' , async (req , res) => {
    try{
        const resturant = await resturantModel.find({title : 'Chicken'});
        sendResponse(res , 200 , resturant , 'Chicken' , false);
    }catch(err){
        sendResponse(res , 403 , null , 'Resturant_Not_Add' , true);
    }
});



module.exports = route




