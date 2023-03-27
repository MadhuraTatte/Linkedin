const express=require("express");
const {connection}=require("./db")
require("dotenv").config()
const {userRouter}=require("./routes/user.routes")
const {authentication}=require("./middleware/user.middleware")
const {postRouter}=require("./routes/post.routes")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(authentication)
app.use("/posts",postRouter)

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.listen(process.env.port,async()=>{
    try{
       await connection
       console.log("Connected to mongodb")
    }catch(err){
        console.log("Unable to connect to mongodb")
        console.log(err)
    }
    console.log("Server is running.")
})