const express = require('express');
const connectdb = require('./Connection/db');
const app = express();

const UserRoute = require('./Routes/mainroute');
const UsereditRoute = require('./Routes/UserRoute');
const Postuser = require('./Routes/PostRoute');          // Give Routes Only 

app.use(express.json());
const PORT = process.env.PORT || 5000;
connectdb;

app.get('/' , () => { console.log('Main page') });
// app.get('/api' , (req,res) => { res.json('On the Main Api indexpage ')})


app.use('/api' ,        UserRoute);                    // For Normal Route 
app.use('/api/users' ,  UsereditRoute);                // For Users 

// For Specific User Actions 
app.use('/api/posts' ,  Postuser);                              


app.listen(PORT, (req,res) => { console.log(`App is running in PORT ${PORT}`)   ; 
})