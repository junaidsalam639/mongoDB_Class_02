const app = require('express');
const router = app.Router();
const userModel = require('../Schema/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sendResponse = require('../helpers/sendResponse');
const authenticationJwt = require('../helpers/authenticationJwt');

router.get('/' , async (req, res) => {
    try {
        const user = await userModel.find();
        sendResponse(res, 200, user, 'User_Get_All', false);
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
})


router.post('/', async (req, res) => {
    try {
        console.log('body console----->', req.body);
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
        console.log('hash password-----> ', hash);
        const user = await userModel.create({ ...req.body });
        sendResponse(res, 200, user, 'User_Add', false);
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log(isPasswordValid);
            if (isPasswordValid) {
                const token = await jwt.sign({
                    data: user
                }, 'JFKJEKLJREKLNHRKLEJTHRJKLTHEJL')
                sendResponse(res, 200, { user , token }, 'User_Login', false);
            } 
            else {
                sendResponse(res, 400, null, 'Password Does Not Exist', true);
            }
        } 
        else {
            sendResponse(res, 400, null, 'Email Does Not Exist', true);
        }
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
});



router.get('/:id', async (req, res) => {
    try {
        console.log('body query----->', req.query);
        const user = await userModel.findById(req.params.id);
        sendResponse(res, 200, user, 'User_Get_One', false);
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
})

router.put('/:id', async (req, res) => {
    try {
        console.log('body params----->', req.params.id);
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
        const user = await userModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        sendResponse(res, 200, user, 'User_Updated', false);
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
})


router.delete('/:id', async (req, res) => {
    try {
        console.log('body params----->', req.params.id);
        const user = await userModel.findByIdAndDelete(req.params.id)
        sendResponse(res, 200, user, 'User_Delete', false);
    } catch (err) {
        sendResponse(res, 400, null, 'User_Not_Found', true);
    }
})

module.exports = router

