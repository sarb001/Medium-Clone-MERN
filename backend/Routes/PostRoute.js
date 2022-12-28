const router =   require('express').Router();
const Post   =   require('../Modules/Post');


// Now the Third Step is that User can  Create Post , Edit that post , Delete it , 
// get Specific Post and others 


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

// Get Post 
router.get('/:id' , async (req,res) => {
    try{
        const getuser = await Post.findById(req.params.id);       //find id 
         res.status(200).json(getuser);
    }catch(err)
    {
        res.status(500).json(err);
    }
})

// Get All POsts 
router.get('/' , async (req,res) => {
    
    const username = req.query.user;           // http://.../posts?
    const catname  = req.query.cat;            // http://.../posts?

    try{
        let posts ;
        if(username){                       // find by username     // https://../posts?user=milli
            posts = await Post.find({ username });
        }else if(catname)                    // by catname          // https://../posts?cat=music
        {   
            posts = await Post.find({
                categories :  {
                    $in : [catname]
                }
            });
        }else{
            posts = await  Post.find();     //find all 
        }
        res.status(200).json(posts);
    }catch(err)
    {
        res.status(400).json(err);
    }
})

module.exports = router;