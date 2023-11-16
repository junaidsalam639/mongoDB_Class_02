const mongoose = require('mongoose');
const { Schema } = mongoose

const blogSchema = new Schema({
    title : {type : String , required : true},
    description : {type : String  , required : true},
    user : {type : mongoose.SchemaTypes.ObjectId , ref : 'users' , required : true},
}, {timestamps : true})

const blogModel = mongoose.model('blogs' , blogSchema);

module.exports = blogModel


