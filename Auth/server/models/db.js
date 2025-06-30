const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema
const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },  // Enforce unique emails
  password: String
});

// ✅ Pre-save hook to hash password before saving
EmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if changed or new
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Create and export the model
const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
