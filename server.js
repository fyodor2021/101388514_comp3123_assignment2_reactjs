const express = require("express");
const employeeRoutes = require("./routes/employees.js");
const userRoutes = require("./routes/users");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const apiv1 = express();
const DB_URL =
  "mongodb+srv://vedoorbbs:Pass11wod22veo@cluster0.ahnfv68.mongodb.net/f2023_comp3123?retryWrites=true&w=majority";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1/emp/employees", employeeRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1", apiv1);

mongoose.Promise = global.Promise;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(`Not Connected, ${error}`);
  });
apiv1.get("/", (req, res) => {
  res.send("<h1>this is the root</h1>");
});

app.listen(3002, () => {
  console.log("server started on port 3002");
});
