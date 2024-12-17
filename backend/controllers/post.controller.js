export const commentOnPost = async(req, res) => {

};

export const likeUnlikePost = async(req, res) =>{

};

export const getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find().sort({ createdAt: -1});

        if(posts.length === 0){
            return res.status(200).json([])
        }

        res.status(200).json(posts);

    }catch(error){
        console.log("Error in getAllPosts controller: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}