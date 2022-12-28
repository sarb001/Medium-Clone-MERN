
const router = require('express').Router();
const User = require('../Modules/register');
const bcrypt = require('bcrypt');


router.post('/' , async (req,res) => {
    try{

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password , salt);
        
        const newuser = new User({
            username  :  req.body.username,
            email     :  req.body.email,
            password  :  hashpassword,
        });
        console.log('hash password is ' , hashpassword);

        const user = await newuser.save();
        res.status(200).json(user);

    }catch(err)
    {
        res.status(400).json(" Error in Registering  ");
        // console.log(' Error!~~~~~  ',err);
    }
})

module.exports = router;