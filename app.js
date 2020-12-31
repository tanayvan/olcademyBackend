var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
//My Routes
const blogRoutes = require("./routes/blog");

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Database Connection
mongoose
  .connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.log("Error Connecting to Database");
  });

//My Routes
app.use("/api", blogRoutes);
const port = 4000;
app.listen(port, () => {
  console.log(`Server Started on Port ${port} `);
});
