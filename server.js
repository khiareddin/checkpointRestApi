// 1. Start a new Node JS project  with ‘ npm init ‘
// 2. Install the mongoose and express and  .env

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

// 3. Configure the environment variables with .env
require("dotenv").config({ path: "./config/.env" });

// 4. Lunch a server with express in the server.js file
const app= express();
app.use(express.json());

const PORT= process.env.PORT || 5000

// 5. Connect your database locally or with mongo atlas
mongoose.connect('mongodb://localhost:27017/DatabaseRestApi')
.then(()=> console.log("Database is connected")).catch(err => console.log(err))


//10. In the server.js create four routes :
// 1. GET :  RETURN ALL USERS 
app.get("/getallusers", (req, res) => {
    User.find()
      .then((users) => res.send(users))
      .catch((err) => console.log(err));
  });

// 2. POST :  ADD A NEW USER TO THE DATABASE 
  app.post("/adduser", (req, res) => {
    const { FirstName, LastName, Age, PhoneNumber,Email } = req.body;
    let newUser = new User({ FirstName, LastName, Age, PhoneNumber, Email});
    newUser
      .save()
      .then(() => res.json({ msg: "User added " }))
      .catch((err) => console.log(err));
  });


// 3. PUT : EDIT A USER BY ID  
app.put("/edituser/:_id", (req, res) => {
    User.findByIdAndUpdate(req.params._id,{...req.body} )
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  });


//4. DELETE : REMOVE A USER BY ID 
  app.delete("/deleteuser/:_id", (req, res) => {
    User.findByIdAndRemove(req.params._id, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    });
  });


app.listen(PORT,()=> console.log(`server is running on PORT${PORT}`));



