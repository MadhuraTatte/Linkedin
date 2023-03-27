const express=require("express")
const {PostModel}=require("../model/post.model")
const postRouter=express.Router();

//create post
postRouter.post("/add",async(req,res)=>{
    try{
         const payload=req.body;
         const post=new PostModel(payload)
         await post.save();
         res.status(200).send({"msg":"New post is created."})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

//get posts
postRouter.get("/",async(req,res)=>{
    try{
        const post=await PostModel.find()
        res.status(200).send(post)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
    
})

postRouter.get("/",async(req,res)=>{
       
    try{
        
        const post=await PostModel.find()
        res.status(200).send(post)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
    
})

postRouter.get("/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const post=await PostModel.findById(id)
        res.status(200).send(post)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
    
})


//update
postRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const payload=req.body
    try{
        await PostModel.findByIdAndUpdate({_id:id},payload)
        res.status(200).send({"msg":"Post updated successfully"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
    
})


//delete
postRouter.delete("/delete/:id",async(req,res)=>{
      const {id}=req.params
    try{
       await PostModel.findByIdAndDelete({_id:id})
       res.status(200).send({"msg":"Post has been deleted."})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
    
})

module.exports={
    postRouter
}