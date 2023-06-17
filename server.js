const express = require("express");
const app = express();
const port = 3000;

app.use("/website", express.static(__dirname + "/website"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/website/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});