const mongoose = require('mongoose');
const { Schema } = mongoose
const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendResponse = require('./helpers/sendResponse');

const practiceSchema = new Schema({
    username : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
});

const practiceModel = mongoose.model('practices' , practiceSchema);

route.get('/' , async (req , res) => {
    try{
        const practice = await practiceModel.find();
        sendResponse(res , 200 , practice , 'User_Found' , false);
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Found' , true);
    }
});

route.post('/' , async (req , res) => {
    try{
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password , salt);
        req.body.password = hash
        const practice = await practiceModel.create({...req.body});
        sendResponse(res , 200 , practice , 'User_Create' , false);
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Found' , true);
    }
});


route.post('/login' , async (req , res) => {
    try{
        const {email , password } = req.body;
        const practice = await practiceModel.findOne({email : email});
        if(practice){
            const isPasswordVerify = await bcrypt.compareSync(practice.password , password);
            console.log(isPasswordVerify);
            if(isPasswordVerify){
               const token = await jwt.sign({
                data : practice,
               }, 'gdksadsajahaadgsjasgsahsafgsfsagsadhfagh');
               console.log(token);
               sendResponse(res , 200 , practice , 'User_Login' , false);
            }else{
                sendResponse(res , 400 , null , 'User_Not_Found' , true);
            }
        }else{
            sendResponse(res , 400 , null , 'User_Not_Found' , true);
        }
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Found' , true);
    }
});


route.put('/:id' , async (req , res) => {
    try{
        const practice = await practiceModel.findByIdAndUpdate(req.params.id {...req.body} , {new : true});
        sendResponse(res , 200 , practice , 'User_Update' , false);
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Found' , true);
    }
});


route.delete('/:id' , async (req , res) => {
    try{
        const practice = await practiceModel.findByIdAndDelete(req.params.id);
        sendResponse(res , 200 , practice , 'User_Delete' , false);
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Found' , true);
    }
});


const responseSend = (res , status , message , data , error) => {
    const response = {
        status : {
            code : status,
            message : message,
        },
        data : data,
        error : error,
    }
    return res(status).json(response);
}


const middleWare = async (req , res , next) => {
    try{
        console.log(req.headers);
        const authorization = req.headers?.authorization?.split(' ')[1];
        console.log(authorization);
        if(authorization){
            const token = await jwt.verify(authorization , 'gdksadsajahaadgsjasgsahsafgsfsagsadhfagh');
            console.log(token);
            sendResponse(res , 200 , token , 'User_Token' , false);
            next();
        }else{
            sendResponse(res , 400 , null , 'User_Not_Found' , true); 
        }
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Found' , true); 
    }
}





