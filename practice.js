const express =  require('express');
const route = express.Router();
const mongoose = require('mongoose');
const sendResponse = require('./helpers/sendResponse');
const { Schema } = mongoose
const bcrypt = require('bcrypt');

const practiceSchema = new Schema({
    username : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
})

const practiceModel = mongoose.model('practices' , practiceSchema);


route.get('/' , async (req , res) => {
    try{
        const practice = await practiceModel.find();
        sendResponse(res , 200 , practice , 'User_Get_All' , false);
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Exess' , true);
    }
})

route.get('/:id' , async (req , res) => {
    try{
        const practice = await practiceModel.findById(req.params.id);
        sendResponse(res , 200 , practice , 'User_One' , false);
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Exess' , true);
    }
})

route.post('/' , async (req , res) => {
    try{
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password , salt);
        req.body.password  = hash
        const practice = await practiceModel.create({...req.body});
        sendResponse(res , 200 , practice , 'User_Add' , false);
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Exess' , true);
    }
})


route.put('/:id' , async (req , res) => {
    try{
        const practice = await practiceModel.findByIdAndUpdate(req.params.id , {...req.body} , {new : true});
        sendResponse(res , 200 , practice , 'User_Updated' , false);
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Exess' , true);
    }
})


route.delete('/:id' , async (req , res) => {
    try{
        const practice = await practiceModel.findByIdAndDelete(req.params.id);
        sendResponse(res , 200 , practice , 'User_Delete' , false);
    }catch(err){
        sendResponse(res , 400 , null , 'User_Not_Exess' , true);
    }
})


const response = async  (res, status , data , message , error) => {
    const resp = {
        status : {
            code : status,
            message : message,
        },
        data : data,
        error : error
    }
    return res.status(status).json(resp);
}


