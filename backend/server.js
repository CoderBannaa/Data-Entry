const  express = require("express");
// import express from "express";
const app = express();
const cors = require('cors');
const mongoose= require ("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const User= require("./models/userModel");
app.use(cors());
app.use(express.json());

  

 mongoose.connect(process.env.URI).then(()=>{
    console.log("connected to db")
    }).catch((e)=>{
    console.log("error",e);
})


app.post("/save", async (req, res) => {
    const{ name, email,age } = req.body;
    try {

        const userData = await User.create({
            name:name,
            email:email,
            age:age,
        

        });
        console.log(userData);
        res.status(201).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/f" , async(req,res)=>{
    const data = await User.find();
    // data.name="hello1223";
    // const a = await data.json();
    return res.json(data);
})


app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
      return res.status(204).send();
    } catch (error) {
      console.error('Failed to delete user:', error);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  })

  app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' });
    }
  });

app.get("/data", (req, res )=> {
    res.send("api runkhjkjnning  ......");

})

console.log("hello");
app.listen(4900,()=>{
    console.log('4900');
});
