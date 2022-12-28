const router =   require('express').Router();
const Post   =   require('../Modules/Post');

// Create Post
router.post('/' , async(req,res) => {
    const newpost =  new Post(req.body);
    try{
        const savedpost = await newpost.save();
        console.log('saved podt it' , savedpost);
        res.status(200).json(savedpost);            // New user created Evertime 
    }catch(err)
    {
        res.status(500).json(err);
    }
})

// Update the Post 
router.put('/:id' , async(req,res) => {                     // username is Unique 
    try
    {   
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)         
        {
            try{
                const updateduser =  await Post.findByIdAndUpdate(req.params.id , {
                    $set : req.body,
                }, { new : true});
                res.status(200).json(updateduser);
            }catch(err) {
                res.status(400).json(err);
             }
        }else
        {
            res.status(401).json(' You can only edit your Post !!!!! ');
        }

    }catch(err)
    {
        res.status(400).json(err);
    }
})

// Delete the Post 
router.delete('/:id' , async(req,res) => {

    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {   
             try
             {
                    await post.deleteOne();
                    res.status(200).json(' Post has been Deleted ');
             }catch(err){
                res.status(400).json(err);
             }
        }
        else{
            res.status(401).json(' You can only Delete your Post !!!!! ');
        }

    }catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;