const mongoose = require('mongoose');
const { Schema } = mongoose

const resturantSchema = new Schema({
    title : {type : String , required : true},
    name : {type : String , required : true},
    price : {type : Number , required : true},
});


const resturantModel = mongoose.model('resturants' , resturantSchema);

module.exports = resturantModel



