const sendResponse = (res , status , data = null , message = null , error = null) => {
    const response = {
        status : {
            code : status,
            message : message
        },
        data : data,
        error : error
    } 

    return  res.status(status).json(response) 
}

module.exports = sendResponse

