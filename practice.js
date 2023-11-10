const mongoose = require('mongoose');
const { Schema } = mongoose
const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendResponse = require('./helpers/sendResponse');


const practiceSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    blog: { type: mongoose.SchemaTypes.ObjectId, ref: 'blogs', required: true },
})

const practiceModel = mongoose.model('practice', practiceSchema);


app.post('/', async (req, res) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
        const practice = await practiceModel.create({ ...req.body });
        sendResponse(res, 200, practice, 'Success', false);
    } catch (err) {
        sendResponse(res, 400, null, 'error', true);
    }
})


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const practice = await practiceModel.findOne({ email: email });
        if (practice) {
            const ispassword = await bcrypt.compareSync(password, practice.password);
            if (ispassword) {
                const token = await jwt.sign({
                    data: practice
                }, 'jdgfdhgfhfdgjghghgdssddssdssdsdsdfdfdfdfddsf')
                sendResponse(res, 200, practice, 'Success', false);
            }
        }
    } catch (err) {
        sendResponse(res, 400, null, 'error', true);
    }
})


app.get('/', async (req, res) => {
    try {
        const practice = await practiceModel.find();
        sendResponse(res, 200, practice, 'Success', false);
    } catch (err) {
        sendResponse(res, 400, null, 'error', true);
    }
})



app.put('/:id', async (req, res) => {
    try {
        const practice = await practiceModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        sendResponse(res, 200, practice, 'Success', false);
    } catch (err) {
        sendResponse(res, 400, null, 'error', true);
    }
})


app.delete('/:id', async (req, res) => {
    try {
        const practice = await practiceModel.findByIdAndDelete(req.params.id);
        sendResponse(res, 200, practice, 'Success', false);
    } catch (err) {
        sendResponse(res, 400, null, 'error', true);
    }
})




const sendResponse2 = (res , status , data , message , error) => {
       const response = {
        status : {
            code : status,
            message : message
        },
        data : data,
        error : error,
       }
       return res.status(status).json(response);
}


const authorization = async (req , res , next) => {
    const authorixe = req.headers?.authorization?.split(' ')[1];
    console.log(authorixe);
    if(authorixe){
       const token = await jwt.verify(authorixe , 'secret-key');
       sendResponse(res, 200, practice, 'Success', false);
       next()
    }else{
        sendResponse(res, 400, null, 'error', true);
    }
}

