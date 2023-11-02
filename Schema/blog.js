const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title : {type : mongoose.SchemaTypes.String , required : true},
    description : {type : mongoose.SchemaTypes.String  , required : true},
    user : {type : mongoose.SchemaTypes.ObjectId , ref : 'users' , required : true},
})

const blogModel = mongoose.model('blogs' , blogSchema);

module.exports = blogModel


