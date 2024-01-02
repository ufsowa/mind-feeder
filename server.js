const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3131;


app.use(cors("*"));
app.use(express.static("dist"));
const jsonParser = bodyParser.json();

app.listen(port,
	() => console.log("Server is running on: ", port));

/*** Routings ***/
app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>")
});

app.get("/songs", function (req, res) {
  readJSONFile('./dist/db/app.json', function (err, db) {
    if(err) { throw err; }
    res.send(db.songs);
  });
});

app.post("/test", jsonParser, (req, res, err) => {
  console.log("reseived data: ", req.body);
  res.json("Successful post");
});


/*** utils ***/
function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}