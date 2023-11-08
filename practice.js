const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendResponse = require('./helpers/sendResponse');
const { token } = require('morgan');
require('dotenv').config();

const userSchema = new Schema({
    username : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
});

const userModel = mongoose.model('practices' , userSchema);


route.get('/' , async (req , res) => {
    try{
        const user = await userModel.find();
        sendResponse(res , 200 , user , 'User_Found' , false);
    }catch(err){
        sendResponse(res , 200 , user , 'User_Not' , false); 
    }
});


route.get('/:id' , async (req , res) => {
    try{
        const user = await userModel.findById(req.params.id);
        sendResponse(res , 200 , user , 'User_Found' , false);
    }catch(err){
        sendResponse(res , 200 , user , 'User_Not' , false); 
    }
});


route.post('/' , async (req , res) => {
    try{
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password , salt);
        req.body.password = hash
        const user = await userModel.create({...req.body});
        sendResponse(res , 200 , user , 'User_Add' , false);
    }catch(err){
        sendResponse(res , 200 , user , 'User_Not' , false); 
    }
});


route.put('/:id' , async (req , res) => {
    try{
        const user = await userModel.findByIdAndUpdate(req.params.id , {...req.body});
        sendResponse(res , 200 , user , 'User_Update' , false);
    }catch(err){
        sendResponse(res , 200 , user , 'User_Not' , false); 
    }
});


route.delete('/:id' , async (req , res) => {
    try{
        const user = await userModel.findByIdAndDelete(req.params.id);
        sendResponse(res , 200 , user , 'User_Delete' , false);
    }catch(err){
        sendResponse(res , 200 , user , 'User_Not' , false); 
    }
});


const response = (res , status , message , data , error) => {
    const resp = {
        status : {
            code : status,
            message : message
        },
        data : data,
        error : error,
    }
    
    return res.status(status).json(resp);
}


const authorization = async (req , res , next) => {
    const authorize = req.headers?.authorization?.split(' ')[1];
    if(authorize){
       const token = await jwt.verify(token , process.env.SECRET_KEY);
       console.log(token);
       sendResponse(res , 200 , user , 'User_Token_Excess' , false);
       next();
    }else{
        sendResponse(res , 200 , user , 'User_Token_Not_Exess' , true);
    }
}
















