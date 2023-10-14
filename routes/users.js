const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/User");
userRouter.get("/", (req, res) => {
  res.send("<h1>this is the root of the users</h1>");
});
userRouter.post("/signup", async (req, res) => {
  if (req.body) {
    try {
      const user = new userModel({
        ...req.body,
      });
      await user.save();
      return res.status(201).send(user);
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
        res
          .status(302)
          .send({
            status: true,
            username: userFound.email,
            message: "User logged in successfully",
          });
      } else {
        res
          .status(404)
          .send({ status: false, message: "Invalid Username and password" });
      }
    } catch (error) {
      res.status(500).send("The Request Body Can't Be Empty");
    }
  }
  res.status(200).send();
});

module.exports = userRouter;
