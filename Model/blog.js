const route = require('express');
const app = route.Router();

app.get('/' , (req , res) => {
    console.log('Blog Request----->' , req.headers);
    res.send( res.send('Get Called on Blog Route'));
})


module.exports = app

