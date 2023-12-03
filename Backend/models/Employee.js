const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    maxlength: 50,
  }
});
module.exports = mongoose.model("employee", employeeSchema);
