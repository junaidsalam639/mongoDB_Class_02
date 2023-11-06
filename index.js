const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRouter = require('./Model/user');
const blogRouter = require('./Model/blog');
app.use(morgan('tiny'));
app.use(express.json());
app.use('/user' , userRouter);
app.use('/blog' , blogRouter);


mongoose.connect('mongodb+srv://Blog:blog@cluster0.4t24tdb.mongodb.net/').then(()=>{
    console.log('MongoDb connect');
}).catch((error) => {
    console.log(error);
})



app.get('/' , (req , res) => {
     res.status(200).send(new Date())
})



app.listen(3000 , () => {
    console.log('App is running on port 3000');
});
