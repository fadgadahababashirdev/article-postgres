const createPost = async(req , res)=>{
    try {
        res.status(200).json({message:"all good and running successfully"})
    } catch (error) {
        res.status(500).json({status:"Failed" , message:error.message})
    }
}
module.exports = createPost