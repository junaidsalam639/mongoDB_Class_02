const jwt = require('jsonwebtoken');
const sendResponse = require('./sendResponse');
require('dotenv').config();

const authenticationJwt = async (req , res , next) => {
    const authorize = req.headers?.authorization?.split(' ')[1];
    console.log('authorization------>',authorize);
    if(authorize){
        const token = await jwt.verify(authorize , process.env.SECRET_KEY);
        console.log(token);
        if(token){
            sendResponse(res, 200, token , 'User_Token_Excess', false);
            next()
        }else{
            sendResponse(res, 400, null, 'User_Token_Not_Exess', true);
        }
    }else{
        sendResponse(res, 400, null, 'User_Token_Not_Exess', true);
    }
}

module.exports = authenticationJwt
