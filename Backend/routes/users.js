const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/User");
const jwt = require('jsonwebtoken')
userRouter.post("/signup", async (req, res) => {
  if (req.body) {
    try {
      const user = new userModel({
        ...req.body,
      });
      const findUser = await userModel.findOne(user)
      if(findUser){
        return res.send({message: "User Already exists"})
      }else{
        await user.save();
        return res.status(201).send(user);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    return res
      .status(400)
      .send({ message: "User Information Needed To Create User." });
  }
});

userRouter.post("/login", async (req, res) => {

  if (req.body) {
    try {
      const user = userModel({
        ...req.body,
      });
      criterias = {
        email: user.email,
        password: user.password,
      };
      
      const userFound = await userModel.findOne(criterias).exec();
      console.log(userFound);

      if (userFound) {
        const token = jwt.sign({userName : userFound.userName, password: userFound.password}, "JwTtOkEnS123EcreT");
 
         return res.status(200).json({
            status:"SUCCESS",
            token: token
          })
      } else {
        res
          .status(500)
          .send({ status: false, message: "Invalid Username and password" });
      }
    } catch (error) {
      res.status(500).send("The Request Body Can't Be Empty");
    }
  }
  res.status(200).send();
});

module.exports = userRouter;
