//router logic
//what is API?
const express = require("express");
//const graphql = require('graphql');

const authenticate = require("../middleware/authenticate");

const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const { check, validationResult } = require("express-validator");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config/config.env" });

/*
http://localhost:8000/user/
*/
// router.get("/", (req, res) => {
//   console.log("inside user route");
//   res.send("user - root : Get Request");
// });

/*
 API : localhost:8000/user/register  - api

 fields: name, email, password
*/
router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("User Name is Required"),
    check("email").isEmail().withMessage("Please Enter Proper Email"),
    check("password")
      .isLength({ min: 2 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (request, response) => {
    console.log("inside post request");
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log("Lot of Erros");
      return response.status(401).json({ errors: errors.array() });
    }
    try {
      //user existed or not- need to check;
      let { name, email, password } = request.body;

      let user = await User.findOne({ email: email });
      console.log(user);
      if (user) {
        return response
          .status(401)
          .json({ errors: [{ msg: "User Already Exits- Please Login" }] });
      }
      //save form data , into database
      //read the from data

      let address = {
        flat: " ",
        street: " ",
        landmark: " ",
        pin: " ",
        city: " ",
        country: " ",
        state: " ",
        mobile: " ",
      };
      let salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      console.log(password);
      user = new User({ name, email, password, address });
      user = await user.save();
      response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ errors: "Server Error" });
    }
  }
);
// router.post("/login");

/* url:  http://localhost:8000/user/login
  fields:email, password
 */
router.post(
  "/login",
  [
    (check("email").isEmail().withMessage("Please Enter Proper Email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 6 characters")),
  ],
  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({ errors: errors.array() });
    }
    try {
      console.log("Inside Login....");
      let { email, password } = request.body;
      //user exited or not
      let user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        return response
          .status(401)
          .json({ errors: [{ msg: "User/Email Not Existed" }] });
        //verify the password
      }
      console.log(user.password);
      let isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //create a token
      let payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, process.env.JWT_SECRET_KEY, (err, token) => {
        if (err) throw err;
        response.status(200).json({
          result: "Login Success",
          token: token,
        });
      });
    } catch (error) {
      return response.status(500).json({ errors: "Server Error" });
    }
  }
);

/*
    3. Get User Info
    URL: http://localhost:8000/user/
    Fields	No-fields
    Method	GET
    Access	PRIVATE

 */
router.get("/", authenticate, async (request, response) => {
  // Get User Info logic
  try {
    let user = await User.findById(request.user.id).select("-password");

    response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

module.exports = router;
