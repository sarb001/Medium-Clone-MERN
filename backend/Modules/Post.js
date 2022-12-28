const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

// This Schema is for Particular User's Action 

const Postregister = new Schema({

    title: {
        type: String,
        required: true,
        unique: true,
      },
      desc: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: false,
      },
      username: {
        type: String,
        required: true,
      },
      categories: {
        type: Array,
        required: false,
      },
    
},{ timestamps : true})

module.exports = mongoose.model('POST',Postregister);