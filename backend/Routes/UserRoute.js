const router =  require('express').Router();
const User =    require('../Modules/Auth');
const bcrypt =  require('bcrypt');

// update the user now Registered 
router.put('/:id',  async (req,res) => {
        if(req.body.userid === req.params.id)
        {
            if(req.body.password)
            {
                const salt         = await bcrypt.genSalt(10);
                const hashpassword = await bcrypt.hash(req.body.password , salt);   
            }
            try
            {
                    const updateuser = await User.findByIdAndUpdate(req.params.id ,
                        {
                            $set : req.body,    
                        },
                        {new : true} 
                    );
                    res.status(200).json(updateuser);
            }
            catch(err)
            {
                res.status(500).json(err);
            }
        }else{
                res.status(401).json('You can only  update your ACCOUNT ');
        }
})


// delete that  user  also 

module.exports = router;