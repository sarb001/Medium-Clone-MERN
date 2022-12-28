const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const userlogin = new Schema({
    username : { type : String , required : true  },
    password : { type : String , required : true }

},{ timestamps : true})

module.exports = mongoose.model('userlogin',userlogin);