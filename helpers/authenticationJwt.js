const jwt = require('jsonwebtoken');
const sendResponse = require('./sendResponse');
require('dotenv').config();

const authenticationJwt = async (req , res , next) => {
    const token = req.headers?.authorization?.split(' ')[1]
    console.log('authorization------>', token );
    if(token){
        const isVerify = await jwt.verify(token , 'JFKJEKLJREKLNHRKLEJTHRJKLTHEJL');
        console.log(isVerify);
        if(isVerify){
            sendResponse(res, 200, isVerify , 'User_Token_Excess', false);
            next()
        }else{
            sendResponse(res, 400, null, 'User_Token_Not_Exess', true);
        }
    }else{
        sendResponse(res, 400, null, 'User_Token_Not_Exess', true);
    }
}

module.exports = authenticationJwt
