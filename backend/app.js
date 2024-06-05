const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoute = require('./router/productRoute.js');
const authMiddleware = require('./middleware/authMiddleware');
const authRoute = require("./router/authRoute.js");
const authController = require('./controller/authController.js');

// create an instances
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5000"],
    credentials: true,
  })
);

// routes middleware
app.use("/products", authMiddleware, productRoute);
app.use("/auth", authMiddleware, authRoute);
app.post('/signup', (req, res) => authController.signup(req, res));
// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// connect to db & start the server
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
})
.catch((err) => console.log(err));
