
const router = require('express').Router();
const User = require('../Modules/login');
const bcrypt = require('bcrypt');

router.post('/' , async (req,res) => {
    try{
        const user = await  User.findOne({username : req.body.username}) // find user 
        console.log('user info is' , user);
            // 
            if(user)
            {
                const comparepass = await bcrypt.compare(req.body.password , user.password) ;
                !comparepass && res.status(400).json(' Wrong Credentails ');
            }else{
                res.status(400).json(' User not Found ');
            }
    }catch(err)
    {
        res.status(400).json('Error While Logging ');
        // console.log(' Error!~~~~~  ',err);
    }
})

module.exports = router;