const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express()
app.use(express.json())
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://0.0.0.0:27017/main")
const db = mongoose.connection
db.once('open',()=>{
    console.log('mongodb connect successfully')
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    psw:String
})

const user = mongoose.model('data',userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'))
})

const signup=async(req,res)=>{
    console.log(req.body);
    const{name,email,psw} = req.body
    const User = new user({
        name,
        email,
        psw
    })
    await User.save();
    res.send('login successfully')
}
app.post('/post',signup)

app.listen(port,()=>{
    console.log('server started')
})