const router = require('express').Router();
const User   = require('../Modules/Auth');
const bcrypt = require('bcrypt');

router.post('/register' , async (req,res) => {
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

router.post('/login' , async (req,res) => {
    try{
        const user = await  User.findOne({username : req.body.username})        // find user 
        console.log(' user info is ' , user);

              if(user)
             {
                const comparepass = await bcrypt.compare(req.body.password , user.password) ;
                if(!comparepass)
                {
                    res.status(400).json(' Wrong Credentails ');
                }
                const { password , ...others } = user._doc;
                res.status(200).json(others);

             }else
             {
                res.status(400).json(' User not Found ');
             }
    }catch(err)
    {
        res.status(400).json(' User not Found !!!!!!! ');
    }
})

module.exports = router;