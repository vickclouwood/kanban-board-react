const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4321;
app.use(express.json({ limit: "100mb" }));
app.use(cors());
app.use(express.static(__dirname));

module.exports = function (cb) {
  app.listen(PORT, async () => {
    cb();
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
};
