const http = require("http");
const express = require("express");
const cors = require("cors");
const HTTP_PORT = 4300;

const app = express();

function initApp(app) {
  app.use(cors());

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });

  //app.use(express.static("www"));

  app.get("/api/get/:delay", function(req, res) {
    const delay = req.params.delay;
    if (delay) {
      setTimeout(
        () => res.sendFile("villain.data.json", { root: "./www" }),
        delay
      );
    } else {
      res.sendFile("villain.data.json", { root: "./www" });
    }
  });
}

initApp(app);
let httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT, () => {
  console.log(`listening on http://localhost:${HTTP_PORT}!`);
});
