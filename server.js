const express = require("express");
const app = express();

const cors = require("cors");
const dotEnv = require("dotenv");

const mongoose = require("mongoose");
const morgan = require("morgan");

app.use(morgan("tiny"));

//configure cors with express.
app.use(cors());

// configure express to accept form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//configure dotEnv
dotEnv.config({ path: "./config/config.env" });

const port = 8000 || process.env.PORT;

//Router Configuration
app.use("/user", require("./router/userRouter"));


app.get("/", (req, res) => {
  console.log("Inside Get Root Request");
  res.send("Hello - Node with ES6- successfully");
  res.exit();
});

//Mongo DB - Database Connection
app.listen(port, (error) => {
  console.log(`Server is Running on ...${port}`);
});
mongoose
  .connect(process.env.MONGODB_LOCAL_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((response) => {
    console.log("Connected to Mongo DB Successfully..............");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1); // stops the node js process
  });
