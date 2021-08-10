const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Handle Parsign Request Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../index.html'));
});

// serve static from client for CSS files
app.use("/client", express.static(path.join(__dirname, "../client")))

// Set static folder - static: files that the webserver (express) reads from the file systen and sends, unmodified, to the client
app.use("/build", express.static(path.join(__dirname, "../build")));

// GLOBAL ERROR Handler
app.use((err, req, res, next) => { //if 4 parameters, it's telling express This is global error handler
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error has occured" },
  };
  const errorObj = Object.assign(err, defaultErr);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

module.exports = app;