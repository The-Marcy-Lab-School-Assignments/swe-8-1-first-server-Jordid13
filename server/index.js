const express = require("express");
const path = require("path");
const filepath = path.join(__dirname, "../app/dist");
const app = express();
const PORT = 8080;

// Middleware
const serveStatic = express.static(filepath);

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

// Register the middleware to be used for all incoming requests
app.use(logRoutes, serveStatic);

// Controllers
const servePicture = (req, res, next) => {
  const data = {
    src: "https://static.wikia.nocookie.net/minecraft/images/f/fe/GrassNew.png/revision/latest?cb=20190903234415",
  };
  res.send(data);
};

const serveJoke = (req, res, send) => {
  const data = {
    setup: "Why did the scarecrow win an award?",
    punchline: "Because he was outstanding in his field!",
  };
  res.send(data);
};

const serveDie = (req, res, send) => {
  const { quantity } = req.query;
  let dieNum = Number(quantity) ? quantity : 1;
  const diesArray = [];
  const data = { rolls: diesArray };
  for (let n = 0; n < dieNum; n += 1) {
    const randomDie = Math.floor(Math.random() * 8 + 1);
    diesArray.push(randomDie);
  }
  res.send(data);
};

// Endpoints
app.get("/api/picture", servePicture);
app.get("/api/joke", serveJoke);
app.get("/api/rollDie", serveDie);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
