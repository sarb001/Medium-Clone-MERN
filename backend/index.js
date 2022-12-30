const express = require('express');
const connectdb = require('./Connection/db');
const app = express();
const path = require('path');
const UserRoute = require('./Routes/mainroute');
const UsereditRoute = require('./Routes/UserRoute');
const Postuser = require('./Routes/PostRoute');          // Give Routes Only 

const Categoryroute = require('./Routes/categories');
const multer = require('multer');

app.use(express.json());
app.use('/images',express.static(path.join(__dirname,"/images")));      // make Path public 
const PORT = process.env.PORT || 5000;
connectdb;

// For Uploading File 
const storage = multer.diskStorage({
    destination  : (req,file,cb) => {
        cb(null,"images");
    },
    filename  : (req, file,cb) => {
        cb(null, 'hello.jpeg');
    }
});

const upload = multer({storage : storage});
app.post('/api/upload' , upload.single('file') , (req,res) => {
    res.status(200).json(" File has been Uploaded ");
})

// app.get('/' , () => { console.log('Main page') });

app.use('/api/auth' ,   UserRoute);                           // For Normal Route 
app.use('/api/users' ,  UsereditRoute);                      // For Users 

// For Specific User Actions 
app.use('/api/posts' ,  Postuser);     

// For Category
app.use('/api/category' , Categoryroute);     



app.listen(PORT, (req,res) => { 
    console.log(`App is running in PORT ${PORT}`)   ; 
})