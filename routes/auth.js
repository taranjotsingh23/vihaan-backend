const router = require("express").Router();
const User = require("../model/User");
const verify= require('./verifyToken');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const cors = require("cors");
// router.use(cors({
//   origin: "*",
// }));

const {
  registerValidation,
  loginValidation
} = require("../validation");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

var expAt = "";

const { db } = require("../model/User");
const { Collection } = require("mongoose");


//--------------------------------Signup--------------------------------------------------------------------------------
router.post("/signup", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({
        resCode: 400,
        message: error.details[0].message,
        name: "",
        email: "",
      });

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if(emailExist) {
    return res
      .status(400)
      .send({
        resCode: 400,
        message: "Email already exists",
        name: "",
        email: "",
      });
  }

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    userId: "Null",
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    authToken: "No Token",
  });

  var savedUser = await user.save();
  var dbObject = await User.findOne({ email: req.body.email });
  var newuserId=dbObject._id.toString();
  var userId=newuserId.substring(0,24);
  var dbResponse=await db.collection("users").updateOne(
    { email: req.body.email },
    { $set: { userId: userId } }
  );

  var collection = db.collection("users");
  var email = req.body.email;
  //Create and assign a token
  const token = jwt.sign({ _id: User._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token);
  collection.updateOne({ email: email }, { $set: { authToken: token } });
  var dbObject = await User.findOne({ email: email });
  var newuserId=dbObject._id.toString();
  var userId=newuserId.substring(0,24);
    res
      .status(200)
      .send({
        resCode: 200,
        message: "User Successfully Registered!!",
        authToken: token,
        name: user.name,
        email: user.email,
        userId: userId
      });
});

//Login
router.post("/login", async (req, res) => {
  //Lets validate the data before we make a user
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({
        resCode: 400,
        message: error.details[0].message,
        name: "",
        email: "",
        authToken: "",
        userId: ""
      });

  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send({
        resCode: 400,
        message: "Email not found",
        name: "",
        email: "",
        authToken: "",
        userId: ""
      });

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .send({
        resCode: 400,
        message: "Invalid Password",
        name: "",
        email: "",
        authToken: "",
        userId: ""
      });

  var dbObject = await User.findOne({ email: req.body.email });
  var newuserId=dbObject._id.toString();
  var userId=newuserId.substring(0,24);

  const checkOtp = await User.findOne({ email: req.body.email });
  if (checkOtp) {
    User.find({ email: req.body.email }, function (err, val) {
      const token = val[0].authToken;
      return res
        .status(200)
        .send({
          resCode: 200,
          message: "Logged in!",
          name: user.name,
          email: user.email,
          authToken: token,
          userId: userId
        });
    });
  }
});


module.exports = router;
