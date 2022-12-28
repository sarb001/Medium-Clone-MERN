const router =   require('express').Router();
const User   =   require('../Modules/User');
const bcrypt =   require('bcrypt');


// Second Step          // now registed user has power to  edit delete 


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
        }else
        {
                res.status(401).json('You can only  update your ACCOUNT ');
        }
})

// delete that  user  also 
router.delete('/:id' , async(req,res) => {

      if(req.body.userid === req.params.id)
      {
        try{
            const user = await User.findById(req.params.id);
                try{
                     await User.findByIdAndDelete(req.params.id);    
                    res.status(200).json(' User has been Deleted ...... ');
                    }catch(err)
                    {
                        res.status(500).json(err);
                    }
        }catch(err)
        {
            res.status(404).json(' User not Found !!!! ');
        }
      }
      else{
          res.status(401).json(' You can only delete your Acount !!!! ');
       }
})

// Get Specific User 
router.get('/:id' , async (req,res) => {
    try{
        const getuser = await User.findById(req.params.id);       //find id 
        const { password , ...others } = getuser._doc;
        res.status(200).json(others);
    }catch(err)
    {
        res.status(500).json(err);
    }
})

module.exports = router;