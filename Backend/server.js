const express = require('express');
const employeeRoutes = require("./routes/employees.js");
const userRoutes = require("./routes/users");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const passport = require('passport');
const apiv1 = express();
const DB_URL = 'mongodb://mongo:27017/app-service';
app.use(passport.initialize());

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

apiv1.use("/emp/employees", employeeRoutes);
apiv1.use("/user", userRoutes);

app.use("/api/v1", apiv1);
require('./routes/jwtStrat.js')(passport)

mongoose.Promise = global.Promise;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: { username: 'root', password: 'root' }
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(`Not Connected, ${error}`);
  });

app.get('/', passport.authenticate('jwt', {session:false}),(req,res) =>{
  res.send("you're home")
})
app.listen(3001, () => {
  console.log("server started on port 3001");
});
