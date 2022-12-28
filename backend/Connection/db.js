const mongoose = require('mongoose');
const dotenv  = require('dotenv');

dotenv.config();

mongoose.set('strictQuery' , false);
 const connectdb = mongoose.connect( process.env.MONGO_URL, 
    {
}).then(console.log('Conneted to Mongodb'))
.catch(err => console.log(err));

exports = {connectdb}

