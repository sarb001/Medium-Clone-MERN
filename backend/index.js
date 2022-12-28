const express = require('express');
const connectdb = require('./Connection/db');
const app = express();

const registerRoute = require('./Routes/registerRoute');
const loginRoute = require('./Routes/loginroute');

app.use(express.json());
const PORT = process.env.PORT || 5000;
connectdb;

app.get('/' , () => { console.log('Main page') });
app.get('/api' , (req,res) => { res.json('On the Main Api indexpage ')})


app.use('/api/register' ,  registerRoute);

app.use('/api/login' ,  loginRoute );

app.listen(PORT, (req,res) => { console.log(`App is running in PORT ${PORT}`)   ; 
})