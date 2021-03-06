require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
// Accessing the path module
const path = require("path");

//creating app
const app = express();

// routes
const routes = require("./routes/quiz");

// connect database
connectDB();

// initialize middleware
app.use(express.json({ extended: false })); //get body and headers in root req obj

// cors
app.use(cors({ origin: true, credentials: true }));

// use routes in /routes/quiz.js
app.use("/api/quiz", routes);

// setting up port
const PORT = process.env.PORT || 8000;

//give heroku server ACCESS to our react application (build folder)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  //if get route on our app is reached, serve index.html to client
  // * means any route, path.join returns /client/build/index.html
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
