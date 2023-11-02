const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRouter = require('./Model/user')
app.use(morgan('tiny'));
app.use(express.json());
app.use('/user' , userRouter);


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



// https://www.vwthemes.net/vw-landing-page-pro/?_gl=1*17xxc30*_ga*NDM0MDk4MTAyLjE2OTg5MzA5MDY.*_ga_LTES5ZN5QH*MTY5ODkzMDkwNi4xLjEuMTY5ODkzMDk4My4wLjAuMA..


// https://preview.vwthemesdemo.com/vw-landing-page-pro/wp-content/themes/vw-landing-page-pro/assets/images/aboutusbg.png

// border: 6px solid transparent;
//     border-image: linear-gradient(to right, #feb65c 0%, #de42ba 100%);
//     border-image-slice: 1;
//     width: 100%;
//     height: 100px;
//     position: absolute;
//     bottom: 0;
//     left: 0;