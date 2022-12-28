const express = require('express');
const connectdb = require('./Connection/db');
const app = express();

const UserRoute = require('./Routes/mainroute');

app.use(express.json());
const PORT = process.env.PORT || 5000;
connectdb;

app.get('/' , () => { console.log('Main page') });
// app.get('/api' , (req,res) => { res.json('On the Main Api indexpage ')})

app.use('/api' ,  UserRoute);


app.listen(PORT, (req,res) => { console.log(`App is running in PORT ${PORT}`)   ; 
})