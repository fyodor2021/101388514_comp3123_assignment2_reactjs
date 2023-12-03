const express = require("express");
const employeeRouter = express.Router();
const employeeModel = require("../models/Employee");
const passport = require('passport');
require('./jwtStrat')(passport);

employeeRouter.route("/").get(passport.authenticate('jwt',{session:false})
  ,async (req, res) => {
  try {
    const employees = await employeeModel.find({}).exec();
    if (employees) {
      res.status(200).send(employees);
    } else {
      res.status(404).send(employees);
    }
  } catch (error) {
    res.status(500).send(error);
  }
})
  .post(passport.authenticate('jwt',{session:false}),async (req, res) => {
    if (req.body) {
      try {
        const employee = new employeeModel({
          ...req.body,
        });
        await employee.save();
        res.status(201).send(employee);
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res
        .status(500)
        .send("Please attach the employee information in the request body");
    }
  });

employeeRouter
  .route("/:eid")
  .get(passport.authenticate('jwt',{session:false}),async (req, res) => {
    try {
      const employee = await employeeModel.find({ _id: req.params.eid }).exec();
      if (employee) {
        res.status(200).send(employee);
      } else {
        res.send({
          status: false,
          message: "No Employee Associated with the ID provided",
        });
      }
    } catch (error) {
      res.status(500).send("ID MUST be provided to find Employee Details");
    }
  })
  .put(passport.authenticate('jwt',{session:false}),async (req, res) => {
    if (req.body) {
      try {
        const employee = await employeeModel.updateOne(
          { _id: req.params.eid },
          { ...req.body }
        );
        res.status(200).send(employee);
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      return res.status(500).send({
        message: "Please attach the employee information in the request body",
      });
    }
  });

employeeRouter.delete("/",passport.authenticate('jwt',{session:false}), async (req, res) => {
  if (req.query) {
    try {
      const employee = await employeeModel.deleteOne({ _id: req.query.eid });
      res.status(204).send("Employee Record Deleted");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send("ID MUST be entered as a query paramter");
  }
});
module.exports = employeeRouter;
