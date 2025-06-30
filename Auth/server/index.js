const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt"); 
const judgeRoute = require('./routes/judge');
require("dotenv").config();
const EmployeeModel = require("./models/db");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/judge', judgeRoute);


const MONGO_URL = process.env.MONGODB_URL;

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err.message));


// ✅ Login route — compare hashed password
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      return res.status(404).json("No record existed");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json("The password is incorrect");
    }

    res.status(200).json("Success");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json("Server error");
  }
});


// ✅ Register route — password is hashed automatically in model
app.post("/register", async (req, res) => {
  try {
    const newUser = new EmployeeModel(req.body); // model pre-save will hash the password
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Register error:", err);
    res.status(400).json(err);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
