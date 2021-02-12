const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/html", { extensions: ["html"] }));

app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);

app.listen(1313, () => {
  console.log("Server running at port 1313");
});