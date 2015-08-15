var express = require("express");
var app = express();

app.set("port", (process.env.PORT || 3030));

app.use(express.static(__dirname + "/client"));

app.listen(app.get("port"));

console.log("Listening on port");