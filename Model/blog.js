const route = require('express');
const app = route.Router();

app.get('/' , (req , res) => {
    console.log('Blog Request----->' , req.headers);
    res.send( res.send('Get Called on Blog Route'));
})

app.post('/' , (req , res) => {
    res.send({
        status : 200,
        msg : req.body
    })
})



module.exports = app

